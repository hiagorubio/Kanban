import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Kanban extends React.Component{
    constructor(props){
        super(props);
        this.colunas = [
            {id: 0, nome:"Espera"},
            {id: 1, nome:"Análise"},
            {id: 2, nome:"Desenvolvimento"},
            {id: 3, nome:"Teste"},
            {id: 4, nome:"Concluído"},
        ];
        this.cartoes=[
            {id: 0, nome: "Primeiro Cartão", idColuna: 0, tempo: 3, dificuldade:"Alta"},
            {id: 1, nome: "Segundo Cartão",  idColuna: 0, tempo: 2, dificuldade:"Média"},
            {id: 2, nome: "Terceiro Cartão", idColuna: 0, tempo: 1, dificuldade:"Baixa"},
        ];
        this.state = ({
            popUpAberto : false,
            draggedOverCol: 0,
        });
        this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
		this.handleOnDragEnd = this.handleOnDragEnd.bind(this);

    }

    handleOnDragEnter(e, id){
        this.setState({draggedOverCol: id});
    }

    handleOnDragEnd(e, cartao){
        this.cartoes.find((item) => {
            return item.id === cartao.id
        }).idColuna = this.state.draggedOverCol;
            this.setState({cartoes : this.cartoes});

    }
    alterarPopUp(){
        this.setState({
            popUpAberto: !this.state.popUpAberto
    });}

   salvarCartao(cartao){
        this.setState({
            popUpAberto: !this.state.popUpAberto
    })
        this.cartoes.push(this.cartao)
    ;}
    
 
    render(){
        return(
            <div className="kanban">
                <div className="kanbanHead">
                    <ul>
                        <li><button className="button" onClick = {this.alterarPopUp.bind(this)}>Novo cartão</button></li>
                        <li> <h1>Kanban Hiago Rubio</h1>      </li>
                        {this.state.popUpAberto ? 
                            <Popup
                                text='Close Me'
                                closePopup={this.alterarPopUp.bind(this)}
                                salvarCartao={this.salvarCartao.bind(this)}
                                cartoes={this.cartoes}
                            />
                            : null
                        }
                    </ul>                                  
                </div>
                <div className="colunas">
                    {this.colunas.map((coluna) => {
                        return(
                            <Colunas id = {coluna.id} nome = {coluna.nome} key={coluna.id} cartoes={this.cartoes}
                                onDragEnter = {this.handleOnDragEnter}
                                onDragEnd = {this.handleOnDragEnd}
                            /> 
                        );
                        }
                    )
                    }              
                </div>
            </div>
        )
    }
}


class Colunas extends React.Component{
    render()
    {
        return(
           <div className="coluna"  
           onDragEnter={(e)=>this.props.onDragEnter(e, this.props.id)}>
                <div className="colunaHead"> 
                    <h2>{this.props.nome}</h2>
                </div>
                {this.props.cartoes.map((cartao) =>{
                    if(cartao.idColuna === this.props.id){
                        return (
                            <Cartao cartao = {cartao} key = {cartao.id}
                            onDragEnd = {this.props.onDragEnd}
                            />
                        );
                    }else return null;
                })}
            </div>
        )
    }
}

class Cartao extends React.Component{
    constructor(props){
        super(props);
        this.mouseIn = this.mouseIn.bind(this);
		this.mouseOut = this.mouseOut.bind(this);

    }
    mouseIn(obj){
        console.log("Hiago IN");
    }

    mouseOut(obj){
        console.log("Hiago Out: ");
    }
    render(){
        return(
            <div className="cartao" onMouseOver={this.mouseIn} onMouseOut={this.mouseOut} draggable={true}
            onDragEnd={(e) => {this.props.onDragEnd(e, this.props.cartao)}}
            >
                <div className="cartaoHead">
                    <h2>{this.props.cartao.nome}</h2>
                </div>
                <div>
                    <p>Tempo: {this.props.cartao.tempo} h
                    <br/> {this.props.cartao.dificuldade}</p>
                </div>
            </div>
        )
    }
}

class Popup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nome : "",
            tempo : "",
            dificuldade : "",
        };
        
        this.cartao = {id: null, nome: null, idColuna: 0, tempo: null, dificuldade:null};
        this.onChangeNome = (e) => {
            this.setState({nome: e.target.value});
        };
        this.onChangeTempo = (e) => {
            this.setState({tempo: e.target.value});
        };
        this.onChangeDificuldade = (e) => {
            this.setState({dificuldade: e.target.value});
        };

    }
    popularCartao(){
        this.cartao =  {id:this.props.cartoes.length, nome:this.state.nome, idColuna:0,  tempo:this.state.tempo, dificuldade:this.state.dificuldade};
        this.props.cartoes.push(this.cartao);
            const closePopup = this.props.closePopup;
            closePopup();
    }
 
    render(){
        return(
            <div className='popup'>
            <div className='popup_inner'>
                <h1>Novo Cartao</h1>
                <div>Título: <input name="titulo" value={this.setState.nome} onChange={this.onChangeNome} type="text" maxLength="20" size="22"></input></div>
                <div>Tempo:  <input name="tempo" value={this.setState.tempo} onChange={this.onChangeTempo} type="number" min="1" max="100"></input></div>
                <div>Dificuldade:  <select value={this.state.dificuldade} onChange={this.onChangeDificuldade}>
                                    <option value="">Selecione</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Média">Média</option>
                                    <option value="Baixa">Baixa</option>
                                   </select>
                </div>
                
                <button onClick={this.props.closePopup}>Cancelar</button>
                <button onClick={this.popularCartao.bind(this)}>Salvar</button>
            </div>
            </div>
        )
    }
}
ReactDOM.render(<Kanban />, document.getElementById('root'));
