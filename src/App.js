import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class AppHeader extends React.Component {
  constructor(props){
    super();

    this.state = {
      odswiez: props.odswiez
    }
  }
  render(){
    return (
      <header className="ui fixed menu">
        <nav className="ui container">
          <a href="#" className="header item">
            <img
              className="logo"
              src="https://typeofweb.com/wp-content/uploads/2017/08/cropped-typeofweb_logo-04-white-smaller-1-e1504359870362.png"
            />
            Lista kontaktów
          </a>
          <div className="header item">
            <button className="ui button">Dodaj</button>
            <button className="ui button" onClick={this.refresh}>Odśwież</button>
          </div>
        </nav>
      </header>
    );
  }
  refresh = () => {
    this.state.odswiez();
  }
}

export class ContactsList extends React.Component {

  contactToContactItem = contact => {
    const avatarUrl = contact.picture.thumbnail;
    const {title, first, last} = contact.name;
    const name = `${title} ${first} ${last}`.trim();
    const phone = contact.phone;
    const key = contact.login.username;
    return <ContactItem
            key={key}
            avatarUrl={avatarUrl}
            name={name}
            phone={phone}
          />;
  };

  render(){
    console.log(this.props);
    console.log("to byly propsy");
    return (
      <ul className="ui relaxed divided list selection">
        {this.props.contacts.map(this.contactToContactItem)}
      </ul>
    );
  }
}

export const ContactItem = ({avatarUrl, name, phone}) => {
  return (
    <li className="item">
      <img src={avatarUrl} className="ui mini rounded image" alt="" />
      <div className="content">
        <h4 className="header">{name}</h4>
        <div className="description">{phone}</div>
      </div>
    </li>
  );
};

export class App extends React.Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers(){
    fetch("https://randomuser.me/api/?format=json&results=10")
      .then(res => res.json())
      .then(json => this.setState({ contacts: json.results }));
  }

  render() {
    const contacts = this.state.contacts;
    const fn = this.getUsers.bind(this);

    return (
      <div>
        <AppHeader
          odswiez={fn}
        />
        <main className="ui main text container">
          {contacts ? <ContactsList contacts={contacts} /> : 'Ładowanie…'}
        </main>
      </div>
    );
  }
}

export default App;
