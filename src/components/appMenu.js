import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";

const primaryMenuOptions = [
  { text: "Home", linkTo: "/", icon: <InboxIcon /> },
  { text: "Top Videos", linkTo: "top-videos", icon: <InboxIcon /> },
  { text: "Top Channels", linkTo: "top-channels", icon: <InboxIcon /> },
  { text: "Progress", linkTo: "progress", icon: <InboxIcon /> },
]

const secondaryMenuOptions = [
  { text: "About", linkTo: "about", icon: <InboxIcon /> }
]

const AppMenu = (props) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={props.toggleMenu(false)}
      onKeyDown={props.toggleMenu(false)}
    >
      <List>
        {primaryMenuOptions.map((option, index) => (
          <ListItem key={option.text} disablePadding>
            <Link to={option.linkTo}>
              <ListItemButton>
                <ListItemIcon>
                  {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.text} />
              </ListItemButton>
           </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryMenuOptions.map((option, index) => (
          <ListItem key={option.text} disablePadding>
            <Link to={option.linkTo}>
              <ListItemButton>
                <ListItemIcon>
                  {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  export default AppMenu;