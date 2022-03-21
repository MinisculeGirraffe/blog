import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

export default function Footer() {
  return (
    <footer className=" mt-10 bg-stone-800">
      <Container>
        <div className=" flex flex-col lg:flex-row items-center">
          <h3 className="text-m  tracking-tighter leading-tight text-center lg:text-left lg:mb-0 lg:pr-4 lg:w-1/2">
           footerlmao
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
          Test
          </div>
        </div>
      </Container>
    </footer>
  )
}
