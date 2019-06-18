import theme from './../../theme/variables/myexpense';

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: theme.brandPrimary,
  },
  content: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: 88,
  },
  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMsg: {
    color: '#777',
    fontSize: 18,
    alignSelf: 'center',
  },
  item: {
    container: {
      flex: 1,
      elevation: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      paddingLeft: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0.3,
      borderBottomColor: '#ddd',
      borderLeftWidth: 0,
    },
  },
};
