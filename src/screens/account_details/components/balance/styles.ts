import { makeStyles, useTheme } from '@material-ui/core/styles';

export const useStyles = () => {
  const defaultTheme = useTheme();
  const styles = makeStyles(theme => {
    return {
      root: {
        '& .MuiTypography-h2': {
          marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.up('lg')]: {
          display: 'flex',
          flexDirection: 'column',
        },
      },
      chart: {
        height: '300px',
        [theme.breakpoints.up('md')]: {
          height: '200px',
          width: '200px',
        },
        [theme.breakpoints.up('lg')]: {
          height: '150px',
          width: '150px',
        },
      },
      chartWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('md')]: {
          flexDirection: 'row',
          alignItems: 'center',
        },
      },
      legends: {
        color: theme.palette.custom.fonts.fontTwo,
        '& .legends__single--container': {
          marginBottom: theme.spacing(1),
          [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        },
        '& .single__label--container': {
          display: 'flex',
          alignItems: 'center',
          marginBottom: theme.spacing(0.5),
          color:'#fff',
          '& .totalCount': {
            fontWeight:700,
            color:'#fff'
           },
        },
        '& .legend-color': {
          width: theme.spacing(1.75),
          height: theme.spacing(1.75),
          borderRadius: '2px',
          marginRight: theme.spacing(1),
        },
        [theme.breakpoints.up('md')]: {
          flex: 1,
          marginLeft: theme.spacing(3),
        },
      },
      divider: {
        margin: theme.spacing(2, 0),
      },
      total: {
        '& .total__single--container': {
          marginBottom: theme.spacing(1),
          display:'block !important',
          '& .label': {
            marginBottom: theme.spacing(0.5),
            color: theme.palette.custom.fonts.fontTwo,
            [theme.breakpoints.up('md')]: {
              
              color: theme.palette.custom.fonts.fontOne,
            },
          },
          [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        },
        '& .total__secondary--container': {
          [theme.breakpoints.up('md')]: {
            color: theme.palette.custom.fonts.fontTwo,
          },
        },
        '& .totalCount': {
         fontWeight:700,
        },
      },
    };
  })();

  return {
    classes: styles,
    theme: defaultTheme,
  };
};
