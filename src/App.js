import React, { Component } from 'react';
import './App.css';
import logo0 from './fleche_vert_v.png';
import logo1 from './fleche_rouge_v.png';

//import {Howl, Howler} from 'howler';


class App extends Component {

    state = {
        retation : 'left',
        logoz : logo0,
        test: false,
        clickFailed : true,
        timer: '',
        position:{
            left:50,
            top:10
        },
        repons:{
            good:[],
            error:[]
        },
      
        
    };
   
    // playSound = event =>{
    //     const sound = new Howl({
    //         html5: true, // A live stream can only be played through HTML5 Audio.
    //         format: ['mp3', 'wav'],
    //         src: event
    //     });
    //     sound.play();
    //     Howler.volume(0.9);
    // };
  


    _handleKeyDown = (event) => {
        switch( event.keyCode ) {
        case 37:
            this.clickHender('left')
            break;
        case 39:
            this.clickHender('right')
            break;
        case 38:
             this.clickHender('top')
            //this.clickHender(directions.top);
            break;
        case 40:
             this.clickHender('bottom')
            //this.clickHender(directions.bottom);
            break;
        default:
        break;
      }
    };

    componentDidMount(){
        document.addEventListener("keydown", this._handleKeyDown, false);
        this.setState({
            timer: setInterval(this.generetetest,1900),
    })
    };


    componentWillUnmount(){
        document.removeEventListener("keydown", this._handleKeyDown, false);
    };
    

   
    clickHender = event => {
        
        this.generetPosition();
        
        if(event === this.state.retation && this.state.logoz === logo0 ){
           // this.playSound(validsund);
           //console.log('good responce');
            let nbr = this.state.repons.good;
            nbr ++;
            this.setState({
                repons:{
                    good: nbr,
                    error:this.state.repons.error
                }
            });
        }else {
            // this.playSound(errorsund);
            // console.log('bad responce');
             // let nbr2 = this.state.repons.error;
             // nbr2++;
             // this.setState({
             //     repons:{
             //         good:this.state.repons.good,
             //         error: nbr2
             //     },  
             // });
             this.setState({
                 clickFailed : false
             });
            console.log("bad");
         }
        this.generetetest();
        
    };

    getlogo = () => {
       // console.log('inside getlogo');
        const logos = [logo0, logo1];
        const logo=  logos[Math.floor(Math.random() * logos.length)];
        this.setState({
            logoz: logo
        });
    }
    switchtest = event => {
       
         if(this.state.clickFailed === false){
            let nbr2 = this.state.repons.error;
             nbr2++;
             this.setState({
                 repons:{
                     good:this.state.repons.good,
                     error: nbr2
                 },  
                 clickFailed :true
             });
           }
         else  if(this.state.clickFailed === true && this.state.logoz === logo1){
            let nbr = this.state.repons.good;
              nbr ++;
              this.setState({
                  repons:{
                      good: nbr,
                      error:this.state.repons.error
                  },
              });
              console.log("good");
           }
    }
    generetetest = event => {
        
            this.getlogo();
            this.generetPosition();
            this.switchtest();
       
    
        const words = ['left', 'right','top', 'bottom'];
        const  pd=  words[Math.floor(Math.random() * words.length)];
        this.setState({
            retation: pd
        });
        // this.setState({
        //     test: true
        // })
       
        //  if (this.state.timer){
        //     // this.playSound(validsund);
        //     if(this.clickHender.event === this.state.retation && this.state.logoz===logo1){
        //         console.log('good');
             
        //     }else{
        //     let nbr = this.state.repons.good;
        //     nbr ++;
        //     this.setState({
        //         repons:{
        //             good: nbr,
        //             error:this.state.repons.error
        //         }
        //  });}}
        // setTimeout(function() { this.setState({ retation: pd}); }.bind(this), 3000);
        //this.clickHender = this.clickHender.bind(this);
    };
    //setTimeout(function() { this.setState({position: 1}); }.bind(this), 3000);
    generetPosition = () =>{
        this.setState({
            position:{
                left:this.getRndInteger(10,80),
                top:this.getRndInteger(10,80)
            }
        })
    };

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min) ) + min;
    };

    render() {
       
        const classes = `${this.state.retation} width-img `;
       

        const divStyle = {
            position: 'absolute',
            left: `${this.state.position.left}%`,
            top: `${this.state.position.top}%`
        };

        return (
            <div>
                <div className="App cader-backgrund" >
                    <img src={this.state.logoz} className={classes} style={divStyle} alt="logo" />
                </div>
                <table>
                    <tbody>
                    <tr>
                        <td>correct :</td>
                        <td>{this.state.repons.good}</td>
                    </tr>
                    <tr>
                        <td>error :</td>
                        <td>{this.state.repons.error}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
    );
    }

}



export default App;
