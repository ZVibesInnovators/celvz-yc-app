import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import * as React from 'react';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import Enums from '../../constants/enums';
import { Box, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

export default function EventCard({ event, selectedEvent, setSelectedEvent, onSelect }) {
  const isSelected = selectedEvent?.id === event.id;
  const eventLink = Enums.URL_REGEX.test(event.link) ? event.link : `${window.location.origin}/events/${event.link}`;
  const eventDate = React.useMemo(() => {
    let prefix = moment(event?.startDate).isAfter() ? "Holds on" : "Held on";
    return `${prefix} ${moment(event?.startDate).format("DD/MM/YYYY hh:mm a")}`
  }, [event])

  const openEventLink = () => {
    window.open(eventLink, "_blank")
  }

  return (
    <Card sx={{ maxWidth: 345, height: "98%", m: 1, mb: 2, display: "flex", flexDirection: "column" }}>
      <CardMedia
        sx={{ height: 180, backgroundPositionY: "top", backgroundSize: "cover" }}
        image={event?.media?.meta?.secure_url}
        title={event.title}
      />
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div">
          {event?.title}
        </Typography>
        <Typography variant="body2" color="text.primary">{event?.description}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, alignItems: "center", display: "flex" }}><EventIcon sx={{ fontSize: 18 }} />&nbsp;{eventDate}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, alignItems: "flex-start", display: "flex" }}><LocationOnIcon sx={{ fontSize: 18 }} />&nbsp;{event?.venue} | {event?.address}</Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small"><ShareIcon /></IconButton>
        <IconButton size="small" onClick={openEventLink}><LinkIcon /></IconButton>
      </CardActions>
      <CardActions>
        <Button disabled={isSelected} variant="contained" onClick={() => onSelect(event)} fullWidth size="small">Manage</Button>
      </CardActions>
    </Card>
  );
}