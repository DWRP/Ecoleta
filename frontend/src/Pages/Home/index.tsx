import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../Components/Header'

import './style.css'
import logo from '../../assets/logo.svg'

import { FiLogIn } from 'react-icons/fi'

function Home() {
  return (
        <div id="page-home">
            <div className="content">       
                <Header img_src={logo} img_alt="Ecoleta"/>
                <main>
                    <h1>Seu Marketplace de coleta de Resíduos</h1>
                    <p>Ajudamos pessoas a encontrarem basess de coleta</p>
                    <Link to="/bases">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre uma base de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
  )
}

export default Home;
