import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'fa fa-address-card-o',
    title: 'Afazeres',
    subtitle: 'Lista de afazeres: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3003/do'
const initialState = {
    toDo: { name: '', begin: '', end: ''},
    list: []
}

export default class ToDo extends Component {
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ toDo: initialState.toDo })
    }

    save() {
        const toDo = this.state.toDo
        const method = toDo.id ? 'put' : 'post'
        const url = toDo.id ? `${baseUrl}/${toDo.id}` : baseUrl
        axios[method](url, toDo)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ toDo: initialState.toDo, list })
            })
    }

    getUpdatedList(toDo, add=true) {
        const list = this.state.list.filter(u => u.id !== toDo.id)
        if(toDo) list.unshift(toDo)
        return list
    }

    updateField(event) {
        const toDo = { ...this.state.toDo }
        toDo[event.target.name] = event.target.value
        this.setState({ toDo })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome da Tarefa</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.toDo.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome da tarefa..." />                             
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Horário do Início</label>
                            <input type="text" className="form-control"
                                name="begin"
                                value={this.state.toDo.begin}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o horário do início..."/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Horário do Fim</label>
                            <input type="text" className="form-control"
                                name="end"
                                value={this.state.toDo.end}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o horário do fim..."/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secundary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(toDo) {
        this.setState({ toDo })        
    }

    remove(toDo) {
        axios.delete(`${baseUrl}/${toDo.id}`).then(resp => {
            const list = this.getUpdatedList(toDo, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Check</th>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Início</th>
                        <th>Fim</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(toDo => {
            return (
                <tr key={toDo.id}>
                    <td className="check">
                        <input type="checkbox"/>
                    </td>
                    <td>{toDo.id}</td>
                    <td>{toDo.name}</td>
                    <td>{toDo.begin}</td>
                    <td>{toDo.end}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(toDo)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <buttton className="btn btn-danger ml-2"
                            onClick={() => this.remove(toDo)}>
                            <i className="fa fa-trash">  </i>
                        </buttton>                        
                    </td>
                </tr>
            )
        })
    }

    render() {        
        return (
            <Main {...headerProps}>
               {this.renderForm()}
               {this.renderTable()}
            </Main>
        )
    }
}