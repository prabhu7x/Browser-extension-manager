import React,{useState, useReducer, useEffect} from 'react'
import { reducer } from '../Reducer'
import jsonData from '../../data.json'
import { AnimatePresence, motion } from 'framer-motion'

function Ext_List({Filter}) {
    const initialState = {data: jsonData, allData: jsonData, currentFilter: Filter}
    const [state, dispatch] = useReducer(reducer, initialState)
    const [toggleState, setToggleState] = useState(null)

    const removeExt = (id) => {
      dispatch({type: 'REMOVE_EXT', payload: id})
    }

    useEffect(()=>{
      dispatch({type: 'GET-DATA', payload: Filter})
    },[Filter, state.currentFilter])
    
    const toggleActive = (name)=>{
      setToggleState(name)
      setTimeout(()=>{
        dispatch({type: 'TOGGLE-ACTIVE', payload: {name: name, currentFilter: Filter}})
        setToggleState(null)
      },500)
    }

  return (
    <div className="ext-list">
      <AnimatePresence>
      { state.data.map((ext, index)=> <motion.div
        key={ext.name}
        layout
        initial={{opacity:0, scale: 0}}
        animate={{opacity:1, scale: 1}}
        transition={{duration: 0.3, ease: 'easeInOut'}}
        className='card' >
            <div className="info">
              <div className='img-with-info'>
                <img src={ext.logo} alt={ext.name} />
                <div className="name">
                    <h2>{ext.name}</h2>
                    <p>{ext.description}</p>
                </div>
              </div>
                <div className="status">
                  <button onClick={()=>removeExt(ext.name)}>remove</button>
                  <label className='switch'>
                    <input type="checkbox" checked={toggleState === ext.name ? !ext.isActive : ext.isActive} onChange={()=>toggleActive(ext.name)} />
                    <span className='slider'></span>
                  </label>
                </div>
            </div>
        </motion.div>)

      } </AnimatePresence>
    </div>
  )
}

export default Ext_List