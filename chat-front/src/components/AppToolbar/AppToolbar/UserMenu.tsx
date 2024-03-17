import React from 'react';
import {User} from '../../../types';
import {Button} from '@mui/material';
import {useAppDispatch} from '../../../app/hooks.ts';
import {useNavigate} from 'react-router-dom';
import {logout} from '../../../features/users/usersThunk.ts';
import Avatar from '@mui/material/Avatar';
import {apiURL} from '../../../constants.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let avatar = user.avatar;
  if (user.avatar && !user.googleID) {
    avatar = apiURL + '/' + user.avatar;
  }
  const logOuted = async () => {
    await dispatch(logout()).unwrap();
    navigate('/');
  };

  return (
    <>
      <Avatar sx={{background: '#ccc', mr: 2}} aria-label="recipe">
        {avatar && <img src={avatar} alt={user.displayName.charAt(0)} style={{maxWidth: '140%', maxHeight: '140%'}}/>}
      </Avatar>
      <Button color="secondary" >Hello, {user.displayName}</Button>
      <Button color="warning" onClick={logOuted}>Log out</Button>
    </>
  );
};

export default UserMenu;