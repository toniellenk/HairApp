import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import Moment from 'moment';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
    
    LocaleConfig.locales['br'] = {
      monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novenbro','Dezembro'],
      monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dec'],
      dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
      dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
      today: 'Hoje\'Hoje'
    };
    
    LocaleConfig.defaultLocale = 'br';
  }


  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={Date.now()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'white', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems(day) {
    // setTimeout(() => {
    //   for (let i = -15; i < 85; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = this.timeToString(time);
    //     if (!this.state.items[strTime]) {
    //       this.state.items[strTime] = [];
    //       const numItems = Math.floor(Math.random() * 5);
    //       for (let j = 0; j < numItems; j++) {
    //         this.state.items[strTime].push({
    //           name: 'Toniel - Cabelo as ' + Moment(time).format('hh:mm:ss')
    //         });
    //       }
    //     }
    //   }
    //   //console.log(this.state.items);
    //   const newItems = {};
    //   Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    //   this.setState({
    //     items: newItems
    //   });
    // }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);

    for (let index = 0; index < 60; index++) {
      this.state.items[this.timeToString(Date.now() + index * 24 * 60 * 60 * 1000)] = [];     
    }

    for (let index = 0; index < 15; index++) {
      var dataAtual = Date.now() + 1 * 24 * 60 * 60 * 50;

      this.state.items[this.timeToString(dataAtual)].push({
        name: 'Toniel - Cabelo as ' + Moment(dataAtual).format('HH:mm')
        + " - " + Moment(dataAtual  + 1 * 24 * 60 * 60 * 50).format('HH:mm')
      });
    }
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Esta data está livre!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#c2e1ff',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
