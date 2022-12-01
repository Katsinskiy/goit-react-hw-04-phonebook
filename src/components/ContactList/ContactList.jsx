import PropTypes from 'prop-types';
import s from './ContactList.module.css';
function ContactList(props) {
  const { contacts, contactOnDelete } = props;

  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <li className={s.item} key={id}>
          <p>
            {name}: {number}
          </p>
          <button
            className={s.button}
            onClick={() => contactOnDelete(id)}
            type="button"
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  contactOnDelete: PropTypes.func.isRequired,
};

export default ContactList;
// friends: PropTypes.arrayOf(
//   PropTypes.shape({
//     avatar: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     isOnline: PropTypes.bool.isRequired,
//     id: PropTypes.number.isRequired,
//   })
// ),
