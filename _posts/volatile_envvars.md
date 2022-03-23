---
title: 'Using Volatile Registry Keys to Store Reboot Nonpersistent Data.'
excerpt: ''
date: '2022-03-22T17:19:16.761Z'
author:
  name: Daniel Norred
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

I had come across a situation where a race condition was introduced by checking whether or not a registry key was present before executing a script. The problem with this logic is that the registry key was removed some time before a system reboot would occur. Typically this window between removal was 1-2 seconds, but in rare cases could vary up to 10 minutes. This introduced a race condition that caused the script to start it's execution pre-reboot because it was assumed that the registry value would always be removed and the system reboot would trigger immediately. To complicate matters further, there was no control or visibility into the where/how this registry key was updated, just that it was going to be removed at some point, after which a system reboot would occur eventually. Furthermore, multiple processes had to check this value, so storing a cached version in process memory wouldn't be sufficient.

The solution for this was to use some sort of value that would persist up until the next system reboot as the condition for the scripts execution and only updating our persistent value when it was present. Using linux this would be simple as a file could just be written to /tmp. The closest Windows analogue is the `REG_OPTION_VOLATILE` property from the [RegCreateKeyExA](https://docs.microsoft.com/en-us/windows/win32/api/winreg/nf-winreg-regcreatekeyexa) win32 API. Per the docs,registry keys written with REG_OPTION_VOLATILE set will only be committed to memory, not persistent storage. Using the .NET APIs, which can call the win32 APIs, PowerShell can be used to both create and detect these volatile registry keys.

[RegistryKey.OpenBaseKey](https://docs.microsoft.com/en-us/dotnet/api/microsoft.win32.registrykey.openbasekey?view=net-6.0) takes two parameters, the registry hive to open, and the 32/64 bit [view](https://docs.microsoft.com/en-us/dotnet/api/microsoft.win32.registryview?view=net-6.0).

```powershell
$regKey = [Microsoft.Win32.RegistryKey]::OpenBaseKey('LocalMachine','default')
```

Our variable `$regKey` can then be used to traverse the registry using the method of [RegistryKey.OpenSubKey](https://docs.microsoft.com/en-us/dotnet/api/microsoft.win32.registrykey.opensubkey?view=net-6.0). For our purpose, we need to supply OpenSubKey with two parameters, a string of our specified subkey, and a bool representing if write access should be granted.

```powershell
$subKey = $regKey.OpenSubKey('Software\Setup', $true)
```
The method [RegistryKey.CreateSubKey](https://docs.microsoft.com/en-us/dotnet/api/microsoft.win32.registrykey.createsubkey?view=net-6.0) can then be used to create our volatile registry key using the [RegistryOptions Enum](https://docs.microsoft.com/en-us/dotnet/api/microsoft.win32.registryoptions?view=net-6.0) as a supplied parameter.

```powershell
$subKey.CreateSubKey('VolatileKey', $true , [Microsoft.Win32.RegistryOptions]::Volatile)
```

Now that our volatile registry key has been created under `HKLM:\System\Setup\VolatileKey`, registry items can be created under this key using standard PowerShell cmdlets such as `Get-Item` and `Set-Item`, which will be cleared once the HKLM registry hive has been unloaded from memory. Detection of if a registry key is volatile or not can be performed using a try/catch block as creating a non volatile subkey will always fail if it's parent is volatile.

```powershell
try {
    $subKey.CreateSubKey('VolatilityTest', $true, [Microsoft.Win32.RegistryOptions]::None)
    $Volatile = $false
    $subKey.DeleteSubKeyTree('VolatilityTest')
}
catch {
    $Volatile = $true
}
```

As a side bar, the registry key `HKCU\Volatile Environment` is also created with `REG_OPTION_VOLATILE`, which as the name would suggest stores volatile environment variables for the current user. Writing values here will also have the same effect of being removed when the HKCU registry hive is unloaded. This isn't exactly the same as unloading on a shutdown. However for most purposes it can be used as a close enough analog.
