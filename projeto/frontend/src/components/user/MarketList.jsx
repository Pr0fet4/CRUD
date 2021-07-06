import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'cart-plus',
    title: 'Lista de Compras',
    subtitle: 'Organizar lista de compras: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3002/itens'
const initialState = {
    itens: { name: '', amount: '' },
    list: []
}

export default class MarketList extends Component {
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ itens: initialState.itens })
    }

    save() {
        const itens = this.state.itens
        const method = itens.id ? 'put' : 'post'
        const url = itens.id ? `${baseUrl}/${itens.id}` : baseUrl
        axios[method](url, itens)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ itens: initialState.itens, list })
            })
    }

    getUpdatedList(itens, add=true) {
        const list = this.state.list.filter(u => u.id !== itens.id)
        if(itens) list.unshift(itens)
        return list
    }

    updateField(event) {
        const itens = { ...this.state.itens }
        itens[event.target.name] = event.target.value
        this.setState({ itens })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do Produto</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.itens.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do produto..." />                             
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="text" className="form-control"
                                name="amount"
                                value={this.state.itens.amount}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a quantidade..."/>
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

    load(itens) {
        this.setState({ itens })        
    }

    remove(itens) {
        axios.delete(`${baseUrl}/${itens.id}`).then(resp => {
            const list = this.getUpdatedList(itens, false)
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
                        <th>Produto</th>
                        <th>Quantidade</th>
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
        return this.state.list.map(itens => {
            return (
                <tr key={itens.id}>
                    <td className="check">
                        <input type="checkbox"/>                                              
                    </td>
                    <td>{itens.id}</td>
                    <td>{itens.name}</td>
                    <td>{itens.amount}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(itens)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <buttton className="btn btn-danger ml-2"
                            onClick={() => this.remove(itens)}>
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