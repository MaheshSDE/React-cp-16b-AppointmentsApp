// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    activeId: false,
  }

  isStarredButton = () => {
    const {activeId} = this.state
    this.setState({activeId: !activeId})
  }

  toggleFavoriteIcon = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFavorite: !eachItem.isFavorite}
        }
        return eachItem
      }),
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    /* const formattedDate = dateInput
      ? format(new Date(dateInput, 'dd MMMM yyyy, EEEE'))
      : '' */
    const newAppointment = {
      id: uuidv4(),
      titleInput,
      date: format(new Date(dateInput), 'dd MMMM yyyy, EEEE'),
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  render() {
    const {titleInput, dateInput, appointmentsList, activeId} = this.state
    const starredButtonStyle = activeId ? 'styledStarredButton' : ''

    let filteredAppointments
    if (activeId === true) {
      filteredAppointments = appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    } else {
      filteredAppointments = appointmentsList
    }

    return (
      <div className="App-container">
        <div className="card-container">
          <div className="appointmentContainer">
            <div>
              <form onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="onInputTitle" className="label">
                  TITLE
                </label>
                <br />
                <input
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                  type="text"
                  className="inputTitle"
                  placeholder="Title"
                  id="onInputTitle"
                />
                <br />
                <label htmlFor="onInputDate" className="label">
                  DATE
                </label>
                <br />
                <input
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                  type="date"
                  className="inputDate"
                  placeholder="dd/mm/yyyy"
                  id="onInputDate"
                />
                <br />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointmentImg"
            />
          </div>
          <hr className="separator" />
          {/*  <div className="appointmentListContainer"> */}
          <div className="headingContainer">
            <h1 className="appointment">Appointments</h1>
            <button
              type="button"
              className={starred-button ${starredButtonStyle}}
              onClick={this.isStarredButton}
            >
              Starred
            </button>
          </div>
          <ul className="unOrderList">
            {filteredAppointments.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                toggleFavoriteIcon={this.toggleFavoriteIcon}
              />
            ))}
          </ul>
          {/*   </div> */}
        </div>
      </div>
    )
  }
}
export default Appointments