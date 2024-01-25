
 import React from 'react';
 import styleNormalizer from 'react-style-normalizer';
 import './styles.scss';
 
 export default class ReactCompass extends React.Component {
     constructor(props) {
         super(props);
 
         this.oldAngle = 0;
     }
 
     static defaultProps = {
         direction: 0,
         directionNames: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
     };
 
     static propTypes = {
         direction: 0,
         directionNames: ['E']
     };
 
     directionName(dir) {
         let sections = this.props.directionNames.length,
             sect = 360 / sections,
             x = Math.floor((dir + sect / 2) / sect);
 
         x = x >= sections ? 0 : x;
 
         return this.props.directionNames[x];
     }
 
     normalizeAngle(direction) {
         let newAngle = direction,
             rot = this.oldAngle || 0,
             ar = rot % 360;
 
         while (newAngle < 0) { newAngle += 360; }
         while (newAngle > 360) { newAngle -= 360; }
         while (rot < 0) { rot += 360; }
         while (rot > 360) { rot -= 360; }
 
         if (ar < 0) { ar += 360; }
         if (ar < 180 && newAngle > ar + 180) { rot -= 360; }
         if (ar >= 180 && newAngle <= ar - 180) { rot += 360; }
 
         rot += newAngle - ar;
         this.oldAngle = rot;
 
         return rot;
     }
 
     render() {
         let dir = this.normalizeAngle(this.props.direction),
             name = this.directionName(dir);
 
         return (
             <div className="compass">
                 <div className="compass__windrose"
                      style={styleNormalizer({ transform: `rotate(-${this.props.direction}deg)` })}>
                     {[...Array(12)].map((k, i) => <div className="compass__mark" key={i + 1}></div>)}
                 </div>
 
                 <div className="compass__arrow-container">
                     <div className="compass__mark--direction-h" 
                     style={styleNormalizer({ transform: `rotate(-${this.props.direction}deg)` })}>
                     </div>
                     <div className="compass__mark--direction-v"
                     style={styleNormalizer({ transform: `rotate(-${this.props.direction + 90}deg)` })}>
                     </div>
                     <div className="compass__arrow"></div>
                     <div className="compass__labels">
                     </div>
                 </div>
             </div>
         );
     }
 }