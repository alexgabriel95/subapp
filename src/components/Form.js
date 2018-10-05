import React, { Component } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import Cards from 'react-credit-cards'
import 'react-credit-cards/lib/styles-compiled.css';
import CreditCardInput from 'react-credit-card-input';
import * as EmailValidator from 'email-validator';




class Form extends Component {

  constructor() {
    super();
    this.state = {
      subscription: 'free',
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      cnumber: '',
      cexpiry: '',
      ccvc: '',
    };
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }



  enviarInformacion() {
if(this.checkFields()){
  let suscripcion = {
    subscription: this.state.subscription,
    nombre: this.state.firstName + " " + this.state.lastName,
    email: this.state.email,
    pais: this.state.country,
  };

  fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(suscripcion, '\t')
  })
    .then(JSON.stringify(suscripcion, '\t'))
    .then(function (data) {
      //FUNCIONO
      console.log(data);

    })
    .catch(function (error) {
      //NO FUNCIONO
      console.log(error)
    });
}
else{
  alert("Campos incompletos/incorrectos");
}
  }



  selectCountry(val) {
    this.setState({ country: val });
  }


  handleChangeCNumber(e) {
    this.setState({ cnumber: e.target.value });
  }

  handleChangeExpiry(e) {
    this.setState({ cexpiry: e.target.value });
  }

  handleChangeCVC(e) {
    this.setState({ ccvc: e.target.value });
  }


  payment() {
    if(this.state.subscription === "premium")
    {
      return (<div><CreditCardInput containerClassName="creditcard" inputClassName="inputCC"
        cardNumberInputProps={{ onChange: this.handleChangeCNumber.bind(this) }}
        cardExpiryInputProps={{ onChange: this.handleChangeExpiry.bind(this) }}
        cardCVCInputProps={{ onChange: this.handleChangeCVC.bind(this) }}
      />


        <Cards number={this.state.cnumber}
          name={this.state.firstName + " " + this.state.lastName}
          expiry={this.state.cexpiry}
          cvc={this.state.ccvc}
        />

      </div>);
    }
  }



  checkFields(){
    let res = false;
   
   
    if((this.state.firstName.length > 0) &&
     (this.state.lastName.length > 0) &&
     (this.state.email.length > 0 ) &&
     (this.state.country.length > 0)){
       res = true;
     };
   
     if(this.state.subscription === "premium"){
       if((this.state.cnumber.length > 0) &&
     (this.state.cexpiry.length > 0) &&
     (this.state.ccvc.length > 0)){
       // aca nada
     }else{
       res = false;
     }
     }
   
     if(!EmailValidator.validate(this.state.email)){
       res= false;
     }
     return res;
   }
   


  render() {
    //const { country } = this.state;
    return (
      <div className="Form">
      <form onSubmit={this.handleSubmit}>

        <div className="form-group">
        <label htmlFor="inputFirstName">Choose your subscription</label>
        <select name="subscription" className="form-control" onChange={e => this.handleChange(e)}>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select></div>

        <div className="form-row">
        

          <div className="form-group col-md-6">
            <label htmlFor="inputFirstName">First Name</label>
            <input name="firstName" type="fisrtName" className="form-control" id="inputFirstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={e => this.handleChange(e)} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLastName">Last Name</label>
            <input name="lastName" type="lastName" className="form-control" id="inputLastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={e => this.handleChange(e)} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input name="email" type="email" className="form-control" id="inputEmail"
            placeholder="Email"
            value={this.state.email}
            onChange={e => this.handleChange(e)} />
        </div>
        <CountryDropdown
          value={this.state.country}
          onChange={(val) => this.selectCountry(val)} className="showBlock" />

        {/*<div className="form-group">
                   <div className="form-check col-md-2">
                      <input className="form-check-input" type="checkbox" id="gridCheck"/>
                      <label className="form-check-label" htmlFor="gridCheck">
                        Free
                      </label>
                    </div>
                    <div className="form-check col-md-2 ml-3">
                      <input className="form-check-input" type="checkbox" id="gridCheck"/>
                      <label className="form-check-label" htmlFor="gridCheck">
                        Premium
                      </label>
                      </div>
                    {/*<div className="form-group col-md-2">
                      <label for="inputZip">Zip</label>
                      <input type="text" className="form-control" id="inputZip"/>
                    </div>
                    <div className="form-group col-md-2">
                      <label for="inputZip">Zip</label>
                      <input type="text" className="form-control" id="inputZip"/>
                    </div>
                    <div className="form-group col-md-2">
                      <label for="inputZip">Zip</label>
                      <input type="text" className="form-control" id="inputZip"/>
        </div>
                  </div>*/}
        <div className="ccDiv"> {this.payment()} </div>

        
      </form><button className="btn btn-danger"
          onClick={() => this.enviarInformacion()}>
          Sign In
                  </button>
                  </div>
    );
  }






}

export default Form;