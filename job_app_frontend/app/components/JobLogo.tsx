import Image from 'next/image'
import logo from "../../../logo.png"
 
export default function JobLogo() {
  return (
    <div>
      <Image
        src={logo}
        width={30}
        height={30}
        alt="Job Logo"
      />
    </div>
  )
}