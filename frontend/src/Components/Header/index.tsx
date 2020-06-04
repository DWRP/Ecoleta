import React from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

interface HeaderProps{
  title?:string
  img_src?:string
  img_alt?:string
  data?:boolean
}

const Header:React.FC<HeaderProps> = ({title,img_src,img_alt,data}) => {

  return (
      <header>
        {title?<h1>title</h1>:""}
        <Link to='/' className='logo-link'>
          <img src={img_src} alt={img_alt} />
        </Link>
        {data?<Link to='/' className='back-link'><FiArrowLeft />Voltar para home</Link>:""}
      </header>
  )
}

export default Header;
