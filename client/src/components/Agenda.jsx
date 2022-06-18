import { useState, useEffect } from 'react'
import Axios from 'axios'
import Card from './Card'

import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'



export default function cadastro() {
  const [listAtividades, setListAtividades] = useState()

  const [form, setForm] = useState("login")
  const [userData, setUserData] = useState()
  const [userAtividades, setUserAtividades] = useState()

  



  //ATIVIDADES
  const handleClickSubmit = (values) => {
    Axios.post("http://localhost:3001/atividades", {
      nome: values.nome,
      descricao: values.descricao,
      inicioData: values.inicioData,
      terminoData: values.terminoData,
      status: values.status,
      ref: userData.idusuarios

    }).then(getAtividades(userData.idusuarios))

    getAtividades(userData.idusuarios)
  }

  const getAtividades = (iduser) => {
    console.log("pegando atividades do id" + iduser)
    Axios.get(`http://localhost:3001/atividades/${iduser}`, {

    }).then(response => {
      setUserAtividades(response.data)

    })
  }




  useEffect(() => {
    try {
      Axios.get(`http://localhost:3001/atividades/${userData.idusuarios}`)
        .then((response) => {
          setListAtividades(response.data)

        });
    } catch (error) {
      console.log(error)
    }

  }, [getAtividades])

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password
    }).then(response => {

      setUserData(response.data[0])
      getAtividades(response.data[0].idusuarios)
    })


  }



  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Não é um e-mail")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(5, "A senha deve ter 5 caracteres")
      .required("Este campo é obrigatório"),
  });


  const validationSubmit = yup.object().shape({
    nome: yup
      .string()
      .required("Este campo é obrigatório"),
    descricao: yup
      .string()
      .required("Este campo é obrigatório"),


  })

  //REGISTRO
  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((res) => {
      alert(res.data.msg)

    })
  }

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Não é um e-mail")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(5, "A senha deve ter 5 caracteres")
      .required("Este campo é obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não são iguais")
      .required("A confirmação da senha é obrigatória!")
  });



  return (
    <div className='text-slate-200 bg-zinc-800  text-center text-2xl' >
      <p>O que deseja fazer?</p>
      <button className="p-2 bg-slate-700 m-2 rounded-md hover:bg-slate-300" onClick={() => setForm("login")}>Login</button>
      <button className="p-2 bg-slate-700 m-2 rounded-md hover:bg-slate-300" onClick={() => setForm("cadastro")}>Criar conta</button>
      {form === "login" && (
        <div className="text-center ">
          <h1>Login</h1>
          <Formik initialValues={{}}
            onSubmit={handleClickLogin}
            validationSchema={validationLogin}
          >
            <Form className='login-form'>
              <div className='login-form-group'>
                <Field name='email' className='w-64 text-black p-2 border-2 rounded border-slate-300 placeholder:pl-1'
                  placeholder='email' />

                <ErrorMessage component='span'
                  name='email'
                  className='text-red-700' />
              </div>

              <div className='login-form-group'>
                <Field name='password' className='w-64 text-black mt-2 p-2 border-2 rounded border-slate-300 placeholder:pl-1'
                  placeholder='senha' />

                <ErrorMessage component='span'
                  name='password'
                  className='text-red-700' />
              </div>
              <button type='submit' className="p-2 mt-3 bg-green-800 rounded hover:bg-green-900">Login</button>
            </Form>
          </Formik>
          {userData != undefined && (
            <div>
              <p> Olá, {userData.email}, bem vindo! logo abaixo está o formulário para adicionar suas atividades</p>

              <h1 className='text-3xl my-4'>Nova Atividade</h1>
              <Formik initialValues={{}}
                onSubmit={handleClickSubmit}
                validationSchema={validationSubmit}
                className="text-black"
              >
                <Form className='login-form'>
                  <div className='login-form-group'>
                    <Field name='nome' className='w-64 text-black my-1 p-2 border-2 rounded border-slate-300 placeholder:pl-1'
                      placeholder='nome' />

                    <ErrorMessage component='span'
                      name='nome'
                      className='text-red-700' />
                  </div>

                  <div className='login-form-group'>
                    <Field name='descricao' className='w-64 text-black my-1 p-2 border-2 rounded border-slate-300 placeholder:pl-1'
                      placeholder='descricao' />

                    <ErrorMessage component='span'
                      name='descricao'
                      className='text-red-700' />
                  </div>

                  <div className='login-form-group'>
                    <Field type="datetime-local" name='inicioData' className='w-64 text-black my-1 p-2 border-2 rounded border-slate-300 placeholder:pl-1'
                      placeholder='data e hora de inicio' />

                    <ErrorMessage component='span'
                      name='starDate'
                      className='text-red-700' />
                  </div>

                  <div className='login-form-group'>
                    <Field type="datetime-local" name='terminoData' className='w-64 text-black my-1 p-2 border-2 rounded border-slate-300 placeholder:pl-1'
                      placeholder='data e hora de termino' />

                    <ErrorMessage component='span'
                      name='descricao'
                      className='text-red-700' />
                  </div>

                  <div className='login-form-group'>
                    <Field name="status" defaultValue="pendente" component="select" className="w-64 text-black my-1 p-2 border-2 rounded border-slate-300 placeholder:pl-1">
                      <option value="pendente">Pendente</option>
                      <option value="concluida">Concluida</option>
                      <option value="cancelada">Cancelada</option>
                    </Field>

                    <ErrorMessage component='span'
                      name='status'
                      className='form-error' />
                  </div>


                  <button type='submit' className='p-2 mt-3 bg-green-800 rounded hover:bg-green-900'>Cadastrar</button>
                </Form>
              </Formik>



              <h1 className="text-4xl my-4">Lista de atividade</h1>
              <div className="flex items-center gap-1">

                {typeof userAtividades !== "undefined" &&
                  userAtividades.map((atividade) => {
                    return <Card key={atividade.idatividades}
                      listAtividades={userAtividades}
                      setUserAtividades={setUserAtividades}
                      userAtividades={userAtividades}
                      getAtividades={getAtividades}
                      userData={userData}
                      id={atividade.idatividades}
                      name={atividade.nome}
                      descricao={atividade.descricao}
                      inicioData={atividade.inicioData}
                      terminoData={atividade.terminoData}
                      status={atividade.status}>
                    </Card>
                  })}


              </div>
            </div>
          )}
        </div>



      )}
      {form === "cadastro" && (
        <div>
          <h1>Crie sua conta</h1>
          <Formik initialValues={{}}
            onSubmit={handleClickRegister}
            validationSchema={validationRegister}

          >
            <Form className='login-form'>
              <div className='login-form-group'>
                <Field name='email' className='w-64 text-black my-1 p-2 border-2 rounded border-slate-300 placeholder:pl-1'
                  placeholder='email' />

                <ErrorMessage component='span'
                  name='email'
                  className='form-error' />
              </div>

              <div className='login-form-group'>
                <Field name='password' className='w-64 text-black my-1 p-2 border-2 rounded border-slate-300 placeholder:pl-1'
                  placeholder='senha' />

                <ErrorMessage component='span'
                  name='password'
                  className='form-error' />
              </div>

              <div className='login-form-group'>
                <Field name='confirmPassword' className='w-64 text-black my-1 p-2 border-2 rounded border-slate-300 placeholder:pl-1'
                  placeholder='confirme a senha' />

                <ErrorMessage component='span'
                  name='password'
                  className='form-error' />
              </div>

              <button type='submit'>Cadastrar</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>

  )
}