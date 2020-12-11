
////////////////////////////////////////
// The new Twitch API.                //
////////////////////////////////////////
   const API_URL = "https://api.twitch.tv/helix/";

////////////////////////////////////////
// My own Client-ID.                  //
// Sign up on https://dev.twitch.tv/  //
// and get your own Client-ID.        //
////////////////////////////////////////
   axios.defaults.headers.common['Client-ID'] = '6hei81bqqw9turh4vpyrzfjz9vkgbm';

////////////////////////////////////////
// POPULAR:                           //
// Component for displaying the most  //
// popular streams.                   //
////////////////////////////////////////
   Vue.component( 'popular', {
    template: '#popular-template',
    props: [ 'popular', 'localStorage', 'stream' ],
    computed: {
      following () {
        return this.$parent.followList.includes( 'user'+this.stream.user_id ) ? 'unfollow':'follow';
      }
    }
   } );

////////////////////////////////////////
// USER PROFILE:                      //
// Component for displaying users.    //
////////////////////////////////////////
   Vue.component( 'user-profile', {
    template: '#user-template',
    props: [ 'user', 'localStorage' ],
    computed: {
      following () {
        return this.$parent.followList.includes( 'user'+this.user.id ) ? 'unfollow':'follow';
      }
    }
   } );

////////////////////////////////////////
// FOLOWING USER:                     //
// Component for displaying those     //
// users the visitor have chosen to   //
// follow on this site.               //
////////////////////////////////////////
   Vue.component( 'following', {
    template: '#following-template',
    props: [ 'user' , 'localStorage' ],
    computed: {
      following () {
        return this.$parent.followList.includes( 'user'+this.user.id ) ? 'unfollow':'follow';
      }
    }
   } );

////////////////////////////////////////
// THE VUE INSTANCE:                  //
// The core of the app's behavior.    //
////////////////////////////////////////
   const app = new Vue( {
    el: '#app',
    data: {
      localStorage  : false,
      popular       : [],
      popularIDs    : [],
      followList    : [],
      followUsers   : [],
      searchUser    : '',
      user          : {
        id     : '',
        login  : '',
        name   : '',
        desc   : '',
        avatar : '',
        url    : '',
        live   : ''
      },
      preloading    : true,
      context       : '',
      error404      : {
        title : '',
        desc  : '',
        notes : ''
      }
    },
    methods: {

      ////////////////////////////////////////////
      // CONTEXT LOADER:                        //
      // Takes care of showing the preloader    //
      // and changing the section to display.   //
      ////////////////////////////////////////////
      loadContext ( context,arg ) {
        this.preloading = true;

        if ( context == 'populars' ) {
          this.context = 'populars';
          this.getPopulars( arg );
        } else if ( context == 'following' ) {
          this.context = 'following';
          this.getFollowing( );
        } else if ( context == 'user' ) {
          this.context = 'user';
          this.getUser( arg );
        }
      },

      ////////////////////////////////////////////
      // FOLLOW/UNFOLLOW USERS:                 //
      // Takes the $events emited from the      //
      // component and add/removes the user     //
      // to the list of 'Users Followed'.       //
      ////////////////////////////////////////////
      onFollow( user ){
        // console.log( user );
        if ( localStorage.getItem( 'user'+user ) ) {
          localStorage.removeItem( 'user'+user );
          this.followList = [];
          for( let user of Object.keys( localStorage ) ) {
            if( /^user\d+$/.test( user ) )
              this.followList.push( user );
          }
        } else {
          localStorage.setItem( 'user'+user , user );
          this.followList.push( 'user'+user );
        }
      },

      ///////////////// PAGE /////////////////////
      //      GET POPULAR 'LIVE' USERS          //
      ////////////////////////////////////////////
      getPopulars ( howMany ) {
        this.context    = 'populars';
        this.popularIDs = '';
        this.popular    = [];

        axios.get( API_URL + `streams?type=live&first=${ howMany }&language=en` )
        .then( ( response ) => {
          // console.log( response.data.data );
          for( let stream of response.data.data ) {
            this.popular.push( {
              game_id   : stream.game_id ? stream.game_id : 'No Game ID',
              user_id   : stream.user_id,
              image     : stream.thumbnail_url ? stream.thumbnail_url.replace( '{width}x{height}', '260x145' ) : '',
              title     : stream.title ? stream.title : 'No description',
              viewers   : stream.viewer_count ? stream.viewer_count : 'No data on viewers',
              streamURL : stream.id ? `https://twitch.tv/streams/${stream.id}/channel/${stream.user_id}` : '#noURL',
              user      : '',
              name      : '',
              userURL   : '',
              userImage : ''
            } );
            if( this.popularIDs == '' ) this.popularIDs = stream.user_id;
            else                        this.popularIDs += `&id=${stream.user_id}`;
          }
        } )
        .then( () => {
          axios.get( API_URL + `users?id=${ this.popularIDs }` )
            .then( ( response ) => {
              for( let i = 0 ; i < this.popular.length ; i++ ) {
                if ( !response.data.data[ i ] ) return this.get404( 'API');
                this.popular[ i ].user        = response.data.data[ i ].login;
                this.popular[ i ].name        = response.data.data[ i ].display_name;
                this.popular[ i ].userURL     = `https://twitch.tv/${response.data.data[ i ].login}`;
                this.popular[ i ].userImage   = response.data.data[ i ].profile_image_url;
              }
              // Hide preloader
              this.preloading = false;
            } )
            .catch( ( error ) => console.log( error ) );
        } )
        .catch( ( error ) => { console.log( error ); } );
      },

      ////////////////// PAGE ////////////////////
      //     GET THE USERS A VISITOR FOLLOW     //
      ////////////////////////////////////////////
      getFollowing ( ) {
        // Initial setup //
        if ( this.followList.length == 0 )
          return this.get404( 'noFavs' );

        this.context      = 'following';
        this.followUsers  = [];

        let queryStream   = '',
            queryUsers    = '';
        for( let user of Object.keys( localStorage ) ) {
          if( /^user\d+$/.test( user ) ) {
            queryUsers  += '&id='+user.substring( 4 );
            queryStream += '&user_id='+user.substring( 4 );
          }
        }
        queryUsers  = queryUsers.substring(  1 );
        queryStream = queryStream.substring( 1 );

        // Querying the API //
        axios.get( API_URL + `users?${ queryUsers }` )
          .then( ( response ) => {
            for( let user of response.data.data ) {
              this.user        = {
                id:'', login:'', name:'', desc:'', avatar:'', url:'', live:''
              }
              this.user.desc   = user.description;
              this.user.name   = user.display_name;
              this.user.login  = user.login;
              this.user.id     = user.id;
              this.user.avatar = user.profile_image_url;
              this.user.url    = 'https://www.twitch.tv/' + user.login;
              this.user.live   = '';
              this.followUsers.push( this.user );
            }
          } )
          .then( () => {
            axios.get( API_URL + `streams?${ queryStream }` )
              .then( ( response ) => {
                for( let i = 0 ; i < response.data.data.length ; i++ ) {
                  this.followUsers.find( user =>
                    user.id === response.data.data[ i ].user_id
                  ).live = 'https://twitch.tv/streams/'
                          + response.data.data[ i ].id
                          + '/channel/'
                          + response.data.data[ i ].user_id;
                }
                // Hide preloader
                this.preloading = false;
              } )
              .catch( ( error ) => console.log( error ) )
          } )
          .catch( ( error ) => {
            // Show preloader
            this.preloading = true;
            this.get404( 'noFavs' );
            console.log( error )
          } );
      },

      ////////////////// PAGE ////////////////////
      //         GET A PARTICULAR USER          //
      ////////////////////////////////////////////
      getUser ( user ) {
        this.context = 'user';
        this.user    = {
          id:'', login:'', name:'', desc:'', avatar:'', url:'', live:''
        }

        axios.get( API_URL + `users?login=${ user }` )
          .then( ( response ) => {
            this.user.desc   = response.data.data[ 0 ].description;
            this.user.name   = response.data.data[ 0 ].display_name;
            this.user.login  = response.data.data[ 0 ].login;
            this.user.id     = response.data.data[ 0 ].id;
            this.user.avatar = response.data.data[ 0 ].profile_image_url;
            this.user.url    = 'https://www.twitch.tv/' + response.data.data[ 0 ].login;
          } )
          .then(
            axios.get( API_URL + `streams?user_login=${ user }` )
              .then( ( response ) => {
                if ( response.data.data[0] )
                  this.user.live = `https://twitch.tv/streams/${response.data.data[0].id}/channel/${response.data.data[0].user_id}`
                // Hide preloader
                this.preloading = false;
              } )
              .catch( ( error ) => console.log( error ) )
          )
          .catch( ( error ) => {
            // Show preloader
            this.preloading = true;
            this.get404( this.searchUser );
            console.log( error )
          } );
      },

      ////////////////// PAGE ////////////////////
      //            USER NOT FOUND              //
      ////////////////////////////////////////////
      get404 ( notFound ) {
        this.context    = '404';

        if( notFound == 'noFavs' ) {
          this.error404.title = `OPPS! STILL EMPTY?`;
          this.error404.desc  = `Sorry, but you didn't add any users to your 'following' list yet.`;
          this.error404.notes = `If you want to see some favourite users here, you may do so by going<br>
          to the main section or search for a username in the search input.<br>
          When you find a user you like, just click on FOLLOW, and come back here.`;
        } else if ( notFound == 'API' ) {
          this.error404.title = `OPPS! SOMETHING WRONG`;
          this.error404.desc  = `Sorry, but an unexpected error happens trying to access the API.`;
          this.error404.notes = `Please, try again later.`;
        } else {
          this.error404.title = `404: Username not found.`;
          this.error404.desc  = `Sorry. The username "<strong>${ notFound }</strong>" was not found.`;
          this.error404.notes = `You may try again with a different username if you want. <br>
          <u>Remember</u>: Due to the lack of a search feature in the Twitch interface, you need to type the username exactly, character by character.`;
        }
        this.preloading = false;
      }

    },
    mounted ( ) {
      // Check if the localStorage is available.               //
      // Needed for the follow/unfollow feature, is available. //
      if ( 'localStorage' in window && window['localStorage'] !== null ) {
        this.followList = [];
        this.localStorage = true;
        for( let user of Object.keys( localStorage ) ) {
          if( /^user\d+$/.test( user ) )
            this.followList.push( user );
        }
      }

      // Gets the 15 most popular streams.
      this.getPopulars( 15 );
    }
   } );