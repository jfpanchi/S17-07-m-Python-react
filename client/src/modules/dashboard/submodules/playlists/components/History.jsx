import {
  Box,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { hexToRgba } from '../../../../../core/utils/hexToRgba';
import { useTheme } from '@emotion/react';
import { Favorite } from '@mui/icons-material';
import { FavoriteBorder } from '@mui/icons-material';
import { MusicPlayerContext } from '../../playlists/services/store/player';
import { useContext } from 'react';
import { PlayArrow } from '@mui/icons-material';
import { formatDuration } from '../../../../../core/utils/formatDuration';
import { AccessTime } from '@mui/icons-material';

export const History = ({ history, loading }) => {
  const { selectTrack, addToMyPlaylist, currentTrackIndex, myPlaylistData } =
    useContext(MusicPlayerContext);
  const [favorites, setFavorites] = React.useState([]);
  const [selectedTrack, setSelectedTrack] = React.useState(null);
  const [notification, setNotification] = React.useState(false);

  const theme = useTheme();
  const backgroundStyle = {
    backgroundImage: `linear-gradient(180deg, ${hexToRgba(theme.palette.background.default, 0.85)}, ${hexToRgba(theme.palette.brown.main, 0.85)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '-8px solid transparent',
    borderImage: `linear-gradient(45deg, ${hexToRgba(theme.palette.background.default, 0.5)}, ${hexToRgba(theme.palette.brown.main, 0.5)}) 1`,
    borderImageSlice: 1,
  };

  useEffect(() => {
    if (history?.history?.length) {
      const trackIds = history.history
        .sort((a, b) => b.order - a.order)
        .slice(-5)

        .map((track) => track.song_id);
      addToMyPlaylist(trackIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const toggleFavorite = (trackNumber) => {
    if (favorites.includes(trackNumber)) {
      setFavorites(favorites.filter((fav) => fav !== trackNumber));
    } else {
      setFavorites([...favorites, trackNumber]);
      showNotification();
    }
  };

  const showNotification = () => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 2000);
  };

  const onSelectTrack = (trackIndex) => {
    setSelectedTrack(trackIndex);
    selectTrack(trackIndex);
  };

  return (
    <Box
      sx={{
        p: 0,
        width: '100%',
        height: { xs: `calc(100vh)`, md: `calc(100vh - 168px)` },
        marginTop: '-64px',
        borderRadius: 4,
        ...backgroundStyle,
      }}
    >
      {notification && (
        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            p: 2,
            borderRadius: 1,
          }}
        >
          Se ha añadido a favoritos
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '80px',
          px: 2,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {loading ? (
          <Skeleton
            variant="rectangular"
            width={150}
            height={150}
            sx={{ borderRadius: 2, mr: 3, mt: 2 }}
          />
        ) : (
          <Typography variant="h1">
            <AccessTime sx={{ width: 150, height: 150, mt: 2 }} />
          </Typography>
        )}
        <Box>
          {loading ? (
            <>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={150} height={30} />
              <Skeleton variant="text" width={150} height={30} />
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                sx={{ color: 'secondary.main', textTransform: 'capitalize' }}
              >
                ¡Recuerdos!
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Escuchados recientemente
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                Estos son los momentos y canciones que has coleccionado en tu
                nido musical
              </Typography>
            </>
          )}
        </Box>
      </Box>

      <Box sx={{ padding: 2 }}>
        <TableContainer
          sx={{
            borderRadius: 4,
            maxHeight: 'calc(100vh - 440px)',
            overflowY: 'auto',
          }}
        >
          <Table aria-label="track table">
            <TableHead>
              <TableRow
                sx={{
                  borderBottom: '2px solid yellow',
                }}
              >
                <TableCell>#</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Artistas</TableCell>
                <TableCell>Duración</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading || !Array.isArray(history.history)
                ? [...Array(5).keys()].map((index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="text" width={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={200} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={150} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={100} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="circular" width={24} height={24} />
                      </TableCell>
                    </TableRow>
                  ))
                : (myPlaylistData || []).map((track, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor:
                          selectedTrack === index
                            ? 'rgba(0, 0, 0, 0.1)'
                            : 'inherit',
                        '&:hover': { backgroundColor: 'brown.main' },
                        borderBottom: 'none',
                      }}
                      onClick={() => onSelectTrack(index)}
                    >
                      <TableCell>
                        {currentTrackIndex === index ? (
                          <PlayArrow color="secondary" />
                        ) : (
                          <Typography>{index + 1}</Typography>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: (theme) =>
                            currentTrackIndex === index &&
                            theme.palette.secondary.main,
                        }}
                      >
                        {track?.title}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: (theme) =>
                            currentTrackIndex === index &&
                            theme.palette.secondary.main,
                        }}
                      >
                        {track?.artist?.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: (theme) =>
                            currentTrackIndex === index &&
                            theme.palette.secondary.main,
                        }}
                      >
                        {track?.duration
                          ? formatDuration(track.duration)
                          : '00:00'}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(track.id);
                          }}
                        >
                          {favorites.includes(track.id) ? (
                            <Favorite />
                          ) : (
                            <FavoriteBorder />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              {myPlaylistData?.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography variant="h6" align="center">
                      ¿Aún no has escuchado una canción completa? ¡Déjate
                      llevar!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
