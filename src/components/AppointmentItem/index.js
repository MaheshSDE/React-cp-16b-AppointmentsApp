// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleFavoriteIcon} = props
  const {titleInput, date, isFavorite, id} = appointmentDetails

  const onFavoriteIcon = () => {
    toggleFavoriteIcon(id)
  }

  const imgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="listContainer">
      <div className="headerContainer">
        <p className="title">{titleInput}</p>
        <button
          type="button"
          className="star-button"
          onClick={onFavoriteIcon}
          data-testid="star"
        >
          <img src={imgUrl} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}
export default AppointmentItem
