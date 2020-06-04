import React, { useState } from 'react'
import axios from 'axios'

import Header from '../../Components/Header'

import './style.css'
import logo from '../../assets/logo.svg'

function Bases() {
  const [estados,setEstados] = useState([]);
  const [cidades,setCidades] = useState([]);
  
  let [cityStatus,setCityStatus] = useState(true)

  async function ufRender(){
    await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(res => {
        let UF = res.data

        let UFs = UF.map((item:{nome:string,sigla:string},index:string)=><option key={index+1} value={item.sigla}>{item.nome}</option>)
        setEstados(UFs)
      })
    
  }

  async function cityRender(UF:string){
    setCityStatus(true)
    await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`)
      .then(res => {
        let city = res.data

        let citys = city.map((item:{nome:string,sigla:string},index:string)=><option key={index+1} value={index}>{item.nome}</option>)
        setCidades(citys)
        setCityStatus(false)
      })
    
  }


  return (
        <div id="page-create-base" onLoad={ufRender}>    
            <Header 
              img_src={logo} 
              img_alt="Ecoleta" 
              data={true}
              />

            <form action="">
              <h1>Cadastro da <br/> base de coleta</h1>
              <fieldset>
                <legend>
                  <h2>Dados</h2>
                </legend>

                <div className="field">
                  <label htmlFor="name">
                    Nome da entidade
                  </label>
                  
                  <input 
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="field-group">
              
                  <div className="field">
                    <label htmlFor="email">
                        Email
                      </label>
                      <input 
                        type="email"
                        name="email"
                        id="email"
                        />
                  </div>
                  
                  <div className="field">
                      <label htmlFor="whatsapp">
                        Whatsapp
                      </label>
                      <input 
                        type="text"
                        name="whatsapp"
                        id="whatsapp"
                        />
                  </div>
                </div>

              </fieldset>

              <fieldset>
                <legend>
                  <h2>Endereço</h2>
                  <span>Selecione o endereço no mapa</span>
                </legend>
                <label htmlFor="uf">
                  Estado
                </label>
                <select 
                  name="uf" 
                  id="uf"
                  className="selection" 
                  onChange={
                    (event)=>cityRender(event.target.value)
                    }>
                  <option key={0} value="" defaultValue="" hidden={true}></option>
                  {
                    estados.map(item=>item)
                  }
                </select>
                
                <label htmlFor="city">
                  Cidade
                </label>
                <select 
                  name="city" 
                  id="city" 
                  className="selection"
                  disabled={cityStatus}
                  
                  >
                  <option key={0} value="" defaultValue="" hidden={true}></option>
                  {
                    cidades.map(item=>item)
                  }
                </select>

              </fieldset>

              <fieldset>
                <legend>
                  <h2>Tipos coletados</h2>
                </legend>
                <div>
                  <label htmlFor="">
                    <input type="text"/>
                  </label>
                </div>

              </fieldset>

            </form>

        </div>
  )
}

export default Bases;
