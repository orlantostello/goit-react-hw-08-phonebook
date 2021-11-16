import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
  link: {
    display: 'inline-block',
    textDecoration: 'none',
    padding: 12,
    fontWeight: 700,
    color: '#2A363B',
  },
  activeLink: {
    color: '#125977',
  },
};

export default function AuthNav() {
  return (
    <div>
      <NavLink to="/register" exact style={styles.link} activeStyle={styles.activeLink}>
        Регистрация
      </NavLink>
      <NavLink to="/login" exact style={styles.link} activeStyle={styles.activeLink}>
        Логин
      </NavLink>
    </div>
  );
}
