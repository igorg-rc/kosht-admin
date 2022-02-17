import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useLocation, NavLink, useHistory } from 'react-router-dom'
import { Dashboard, Person, Description, Category, ListAlt, RssFeed, AttachMoney } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme =>({
  navLink: {
    textDecoration: 'none',
    color: '#000'
  },
  listItemText: { 
  },
  activeNavLink: {
    color: '#5669FF'
  }
}))


export const MainListItems = () => {
  const styles = useStyles()
  const { pathname } = useLocation()
  const history = useHistory()
  return <div>
    <ListItem button onClick={e => history.push('/')}>
      <ListItemIcon style={{ color: (
          !pathname.includes('posts') && !pathname.includes('categories') && !pathname.includes('tags') && 
          !pathname.includes('contacts') && !pathname.includes('banners') && !pathname.includes('subscribers') 
        ) && '#5669FF' }}><Dashboard /></ListItemIcon>
        <NavLink 
          to="/" 
          className={styles.navLink} 
          activeClassName={styles.activeNavLink} 
          isActive={() => ['/'].includes(pathname)}
        >
        <ListItemText className={styles.listItemText} primary="Dashboard" />
        </NavLink>
    </ListItem>
    <ListItem button onClick={e => history.push('/posts')}>
      <ListItemIcon style={{ color: pathname.includes('posts') && '#5669FF' }}><Description /></ListItemIcon>
      <NavLink 
        to="/posts" 
        className={styles.navLink} 
        activeClassName={styles.activeNavLink} 
        isActive={() => pathname.includes('posts')}
      >
      <ListItemText className={styles.listItemText} primary="Posts" />
      </NavLink>
    </ListItem>
    <ListItem button onClick={e => history.push('/categories')}>
      <ListItemIcon style={{ color: pathname.includes('categories') && '#5669FF' }}><Category /></ListItemIcon>
      <NavLink 
        to="/categories" 
        className={styles.navLink} 
        activeClassName={styles.activeNavLink} 
        isActive={() => pathname.includes('categories')}
      >
      <ListItemText className={styles.listItemText} primary="Categories" />
      </NavLink>
    </ListItem>
    <ListItem button onClick={e => history.push('/tags')}>
      <ListItemIcon style={{ color: pathname.includes('tags') && '#5669FF' }}><ListAlt /></ListItemIcon>
      <NavLink 
        to="/tags" 
        className={styles.navLink} 
        activeClassName={styles.activeNavLink} 
        isActive={() => pathname.includes('tags')}
      >
      <ListItemText className={styles.listItemText} primary="Tags" />
      </NavLink>
    </ListItem>
    <ListItem button onClick={e => history.push('/contacts')}>
      <ListItemIcon style={{ color: pathname.includes('contacts') && '#5669FF' }}><RssFeed /></ListItemIcon>
      <NavLink 
        to="/contacts" 
        className={styles.navLink} 
        activeClassName={styles.activeNavLink} 
        isActive={() => pathname.includes('contacts')}
      >
      <ListItemText className={styles.listItemText} primary="Contacts" />
      </NavLink>
    </ListItem>
    <ListItem button onClick={e => history.push('/banners')}>
      <ListItemIcon style={{ color: pathname.includes('banners') && '#5669FF' }}><AttachMoney /></ListItemIcon>
      <NavLink 
        to="/banners" 
        className={styles.navLink} 
        activeClassName={styles.activeNavLink} 
        isActive={() => pathname.includes('banners')}
      >
      <ListItemText className={styles.listItemText} primary="Banners" />
      </NavLink>
    </ListItem>
    <ListItem button onClick={e => history.push('/subscribers')}>
      <ListItemIcon style={{ color: pathname.includes('subscribers') && '#5669FF' }}><Person /></ListItemIcon>
      <NavLink 
        to="/subscribers" 
        className={styles.navLink} 
        activeClassName={styles.activeNavLink} 
        isActive={() => pathname.includes('subscribers')}
      >
      <ListItemText className={styles.listItemText} primary="Subscribers" />
      </NavLink>
    </ListItem>
  </div>
}