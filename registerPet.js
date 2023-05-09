import React from 'react';
import {Button, ScrollView, View, Text, TextInput, ImageBackground, StyleSheet} from 'react-native';
import imgMarket from './assets/snack-icon.png';

// function Principal () { 
//   return (
//     <View style={{marginTop: 50, flex: 1}}>
//       <Text>Lista Mercado 2</Text>
//     </View>
//   );
// }

const estilos = StyleSheet.create({
  input : { backgroundColor: "white",
            borderColor: "#2c64c6", borderWidth: 2, borderRadius: 20,
            marginHorizontal: 15, marginVertical: 5,
            height: 50, paddingHorizontal: 10 },
  titulo: {fontSize: 48, color: "white"}
});

class ProdutoFormulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {marca: "", modelo: "", tipo: "", preco:"", lista: []}
  }

  render() {
    // const listaVisuais = [];
    // for (const obj of this.state.lista) {
    const listaVisuais = this.state.lista.map(
      (obj, idx)=> {
        return (
          <View key={idx} style={{marginTop:10}}>
            <Text>{obj.marca}</Text>
            <Text>{obj.modelo}</Text>
            <Text>{obj.tipo}</Text>
            <Text>R$ {obj.preco}</Text>
          </View>
        );
      }
    );

    return (
      <>
        <View style={{flex: 1}}>

          <TextInput value={this.state.marca}
              onChangeText={(txt)=>{
                this.setState({marca: txt});
              }}
              style={estilos.input} placeholder="marca"/>

          <TextInput value={this.state.modelo} 
              onChangeText={(txt)=>{
                this.setState({modelo: txt})
              }}
              style={estilos.input} placeholder="modelo"/>

          <TextInput value={this.state.tipo}
              onChangeText={(txt)=>{
                this.setState({tipo: txt})
              }}
              style={estilos.input} placeholder="tipo"/>
          <TextInput value={this.state.preco}
              onChangeText={(txt)=>{
                this.setState({preco: txt})
              }}
              style={estilos.input} placeholder="preco"/>
            <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
                        <Button color="#3a1b0f" title="Salvar" onPress={
            ()=> {
              const obj = {marca: this.state.marca, modelo: this.state.modelo,
                tipo: this.state.tipo, preco: this.state.preco};
                
              this.setState( {lista: [...this.state.lista, obj]} );
            }}/>
            </View>
        </View>
        <ScrollView style={{flex: 1}}> 
              {listaVisuais}
        </ScrollView>
      </>
    )
  }
}

export default () => {
  
  return (
    <View style={{marginTop: 0, flex: 3, 
        backgroundColor: "#ffb652"}}>
      <ImageBackground source={imgMarket} resizeMode="cover"
          style={{flex: 1, padding: 50}}>
          <View style={{flex: 1, borderRadius: 20,
            justifyContent: "center", alignItems: "center",
            backgroundColor: "#f8e08a8f"}}>
            <Text style={estilos.titulo}>Loja</Text>
            <Text style={estilos.titulo}>som dos</Text>
            <Text style={estilos.titulo}>anjos</Text>
          </View>
      </ImageBackground>
      <View style={{flex: 3}}>
          <ProdutoFormulario/>
      </View>
      <View style={{flexDirection:'row', width:'100%', justifyContent:'center'}}>
            { true ? (
        <Text>true</Text>
      ):
      (
        <Text>false</Text>
      )}

        <Button color="#f5e740" title="Cadastro"/>
        <Button color="#f5e740" title="Lista"/>
      </View>
    </View>
  );
}
