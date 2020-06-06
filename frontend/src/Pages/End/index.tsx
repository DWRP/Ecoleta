import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../Components/Header'

import './style.css'
import logo from '../../assets/logo.svg'

import { FiLogOut } from 'react-icons/fi'

function End() {
  return (
        <div id="page-home_end">
            <div className="content">       
                <Header img_src={logo} img_alt="Ecoleta"/>
                <main>
                    <h1>Base cadastrada</h1>
                    <p>
                        Obrigado por usar nosso serviço.<br />
                        Tudo ocorreu com sucesso!!
                    </p>
                    <Link to="/">
                        <strong>Voltar ao início</strong>
                        <span>
                            <FiLogOut />
                        </span>
                    </Link>
                </main>
            </div>
        </div>
  )
}

export default End;
