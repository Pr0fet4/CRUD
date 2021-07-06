import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu mt-3">
            <Link to="/">
                <i className="fa fa-home"></i> Ínicio
            </Link>
            <Link to="/users">
                <i className="fa fa-users"></i> Usuários
            </Link>
            <Link to="/itens">
                <i className="fa fa-cart-plus"></i> Compras
            </Link>
            <Link to="/do">
                <i className="fa fa-address-card-o"></i> Afazeres
            </Link>
        </nav>
    </aside>