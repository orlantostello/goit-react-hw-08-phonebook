import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from 'redux/auth';
import defaultAvatar from './default-avatar.png';
import s from './UserMenu.module.css';
import { Button } from '@mui/material';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  const avatar = defaultAvatar;

  return (
    <div className={s.container}>
      <div>
        <img src={avatar} alt="Avatar" width="32" className={s.avatar} />
      </div>
      <span className={s.name}>
        Welcome, {name.slice(0, 1).toUpperCase()}
        {name.slice(1)}
      </span>
      <Button
        type="button"
        onClick={() => dispatch(authOperations.logOut())}
        style={{ marginTop: '05px' }}
        variant="contained"
        color="error"
        size="small"
      >
        Logout
      </Button>
    </div>
  );
}
