import PropTypes from 'prop-types';
import s from './SectionTitle.module.css';
const SectionTitle = ({ title, children }) => {
  return (
    <section className={s.section}>
      <h1>{title}</h1>
      {children}
    </section>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SectionTitle;
