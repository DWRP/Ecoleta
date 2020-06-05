import React, { useState, useEffect, ChangeEvent, FormEvent,  } from 'react'
import axios from 'axios'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import Header from '../../Components/Header'

import './style.css'
import logo from '../../assets/logo.svg'
import arrowDwn from '../../assets/down-arrow.svg'
import { useHistory } from 'react-router-dom'


function Bases() {
  const history = useHistory()

  const stl = {
      background: `url(${arrowDwn}) no-repeat #eee`,
      backgroundPosition: 'right',
      backgroundSize: '20px',
      backgroundPositionX: '41vw'
    }
  const [initialPos,setInitialPos] = useState<[number,number]>([0,0])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude,longitude} = position.coords;
      setInitialPos([latitude,longitude])
      setPos([latitude,longitude])
    })
  },[])
  const [pos,setPos] = useState<[number,number]>([0,0])
  const [types,setTypes] = useState([])

  const [formData,setFormData] = useState({
    name: '',
    email:'',
    whatsapp:''
  })
  
  const [selectedItems,setSelectedItems] = useState<number[]>([])
  const [estados,setEstados] = useState([])
  const [cidades,setCidades] = useState([])
  const [city,setCity] = useState('')
  const [uf,setUf] = useState('')

  let [cityStatus,setCityStatus] = useState(true)

  async function cityRender(UF:string){
    
    setCityStatus(true)
    setCity('')
    await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`)
      .then(res => {
        let city = res.data

        let citys = city.map((item:{nome:string,sigla:string},index:string)=><option key={index+1} value={item.nome}>{item.nome}</option>)
        setCidades(citys)
        setCityStatus(false)

      })
    }

    function handleMapClick(event:LeafletMouseEvent){ 
      setPos([event.latlng.lat,event.latlng.lng])
    }

    useEffect(()=>{
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(res => {
        let UF = res.data

        let UFs = UF.map((item:{nome:string,sigla:string},index:string)=><option key={index+1} value={item.sigla}>{item.nome}</option>)
        setEstados(UFs)
      })
      axios.get('http://localhost:3333/types').then(
        res => setTypes(res.data)
      )
      
    },[])

    function handleSelectItem(id:number){

      setSelectedItems(selectedItems.includes(id)?selectedItems.filter(item_id=>item_id!==id):[...selectedItems,id])
    }

    function handleInput(event:ChangeEvent<HTMLInputElement>) {
      
      let {name,value} = event.target;

      setFormData({
          ...formData,
          [name]: value
        })
    }

    async function handleSubmit(event:FormEvent){
        event.preventDefault()
        
        const data = {
          ...formData,
          latitude:pos[0],
          longitude:pos[1],
          city,
          uf,
          types:selectedItems
        }

        await axios.post('http://localhost:3333/bases',data)
        alert('Base criada! ')
        history.push('/')
    }
  return (
        <div id="page-create-base">    
            <Header 
              img_src={logo} 
              img_alt="Ecoleta" 
              data={true}
              />

            <form action="" onSubmit={handleSubmit}>
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
                    onChange={handleInput}
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
                        onChange={handleInput}

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
                        onChange={handleInput}
                        />
                  </div>
                </div>

              </fieldset>
              <Map center={initialPos} zoom={7} onClick={handleMapClick}>
                <TileLayer 
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={pos[0] === 0?initialPos:pos}/>
              </Map>
              

              <fieldset>
                <legend>
                  <h2>Endereço</h2>
                  <span>Selecione o endereço no mapa</span>
                </legend>
                
                <div className="field">
                  <label htmlFor="uf">
                    Estado
                  </label>
                  <select 
                    name="uf" 
                    id="uf"
                    style={stl}
                    className="select-options"
                    value={uf}
                    onChange={
                      (event)=>{
                          setUf(event.target.value)
                          cityRender(event.target.value)
                        }
                      }
                      
                    >
                    <option key="0" value="0" defaultValue="" hidden={true}>Selecione um Estado</option>
                    {
                      estados.map(item=>item)
                    }
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="city">
                    Cidade
                  </label>
                  <select 
                    name="city" 
                    id="city" 
                    className="select-options"
                    style={stl}
                    disabled={cityStatus}
                    onChange={(event)=>setCity(event.target.value)}
                    value={city}
                    >
                    <option key="0" value="0" defaultValue="" hidden={true}>Selecione uma cidade</option>
                    {
                      cidades.map(item=>{
                        return item
                      })
                    }
                  </select>
                </div>
                

              </fieldset>

              <fieldset>
                <legend>
                  <h2>Tipos coletados</h2>
                  <span>Selecione os tipos de itens de coleta </span>
                </legend>
                <ul className="items-grid">
                {
                  types.map((item:{id:string,img_url:string,title:string}) => (
                    <li key={item.id} onClick={()=>handleSelectItem(Number(item.id))}
                      className={selectedItems.includes(Number(item.id))?"selected":""}
                    >
                        <img src={item.img_url} alt="" />
                        <span>{item.title}</span>
                    </li>
                  ))
                }
                </ul>

              </fieldset>
              
              <button type="submit" onClick={()=>{}}>
                  Cadastrar Base
              </button>
            </form>

        </div>
  )
}

export default Bases;
