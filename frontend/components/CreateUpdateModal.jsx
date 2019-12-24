import React, { PureComponent, useEffect, useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { queries } from '../actions/queries';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../scss/Modal.scss';
import debounce from 'lodash/debounce';

class SelectContainer extends React.Component {
    render(){
      return (<div onKeyUp={this.props.inputChange}>{this.props.children}</div>)
    }
  }

export class CreateUpdateModal extends PureComponent {
    state = {
        title: [],
        name: "",
        description: "",
        createdFor: "",
        createdBy: "",
    };

    componentDidMount() {
        this.findUserByName = debounce(this.findUserByName, 1000);
        Modal.setAppElement('body');
    }
    
    categoriesChange = item => {
        this.setState({ title: item });
    };
    inputChange(e){
        this.findUserByName();
        this.setState({
           name: e.target.value
        })
    }
    fetchData = () => {
          fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: queries.authTypes.findUser,
              variables: { nickname: "nazar"}
            }),
          })
            .then(response => {
              return response.json()
            })
            .then(responseAsJson => {
              this.setState({ loading: false, data: responseAsJson.data })
            })
      }
    findUserByName = () =>{
        this.fetchData();
    }
    valueChange = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    render() {
        const allegedUsers = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ];
          
        const { modalIsOpen, closeModal, customStyles, ingredientsList } = this.props;
        console.log(this.state);
        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Search"
            >
                <p className={styles.authTitle}>Create form</p>
                <form className={styles.searchForm}>
                    <input placeholder="Title" name="title" type="text" onChange={this.valueChange} />
                    <textarea cols="30" rows="5" placeholder="description" />
                    <div>
                    <SelectContainer inputChange={this.inputChange.bind(this)}>
                        <Select
                            id="findByName"
                            value={this.state.title}
                            onChange={this.categoriesChange}
                            options={allegedUsers}
                            placeholder="Send to"
                            isMulti
                        />
                    </SelectContainer>
                    </div>
                    <button className={styles.signInBtn}>Submit</button>
                </form>
            </Modal>
            
        );
    }
}
