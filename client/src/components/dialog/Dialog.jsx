import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import {MenuItem, MenuList, NativeSelect, Select} from "@material-ui/core";


export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    status: props.status,
  });
console.log(props.userData)
  const handleChangeValues = (value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [value.target.id]: value.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditAtividades = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      status: editValues.status,
    }).then(() => {
      props.setUserAtividades(
        props.listAtividades.map((value) => {
          return value.idatividades == editValues.id
            ? {
              idatividades: editValues.id,
              status: editValues.status 
            }
            : value;
        })
      );
     props.getAtividades(props.userData.idusuarios)
    });
    handleClose();
  };

  const handleDeleteGame = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id != editValues.id;
        })
      );
    });

    props.setUserAtividades(props.userAtividades)
    props.getAtividades(props.userData.idusuarios)
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            id="name"
            label="Nome do evento"
            defaultValue={props.nome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            disabled
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            defaultValue={props.descricao}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <NativeSelect
            id="status"
            defaultValue={props.status}
            label="Status"
            onChange={handleChangeValues}
            type="text"
          >
            <option value={"pendente"}>Pendente</option>
            <option value={"concluida"}>Concluida</option>
            <option value={"cancelada"}>Cancelada</option>
          </NativeSelect>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteGame()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditAtividades()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}