import React from "react";
import FormDialog from "./dialog/Dialog"

export default function Card(props) {
    const [open, setOpen] =  React.useState(false);

    const handleClickCard = () => {
        setOpen(true)
    }
    return(
        <>
       
        <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.name}
        descricao={props.descricao}
        inicioData={props.inicioData}
        terminoData={props.terminoData}
        listAtividades = {props.listAtividades}
        setUserAtividades={props.setUserAtividades}
        userAtividades = {props.userAtividades}
        getAtividades={props.getAtividades}
        userData={props.userData}
        status = {props.status}
        id={props.id}
      />
        <div className="border-2 my-2 flex flex-col text-center hover:bg-slate-800 transition-colors hover:cursor-pointer"
             onClick={() => handleClickCard()}>
            <h1 className="text-slate-200 font-black py-2 text-2xl">Nome: {props.name}</h1>
            <p className="text-slate-400 text-lg  font-medium">Descrição: {props.descricao}</p>
            <p className="text-slate-300 font-semibold text-xl">Data e hora de inicio : {new Date(props.inicioData).toLocaleString()}</p>
            <p className="text-slate-300 font-semibold text-xl">Data e hora de Término: {new Date(props.inicioData).toLocaleString()}</p>
            <p className="text-slate-300 font-semibold text-xl">Status: {props.status}</p>     
        </div>
        </>
        
    )
} 