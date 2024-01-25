import React from 'react';
import './css/base.css'
import './css/form-controls.css'
import './css/adaptive.css'
import './fonts/style.css'
import './css/animate.css'
import './fonts/Montserrat/stylesheet.css'
import AuthMain from './components/authorization/AuthMain';
import DeathScreen from './components/deathscreen/App';
import EditorMain from './components/editorplayer/EditorMain';
import Inventory from './components/inventory/Inventory';
import Phone from './components/phone/Phone';
import Hud from './components/hud/Hud';
import IDCard from './components/idcard/IDCard';
import License from './components/license/License';
import Certificate from './components/certificate/Certificate';
import Walkietalkie from './components/walkietalkie/Walkietalkie';
import WorkID from './components/workid/WorkID';
import ModalInput from './components/modalinput/ModalInput';
import Notification from './components/notification/Notification';
import CarShop from './components/carshop/CarShop';
import Quickmenu from './components/quickmenu/Quickmenu';
import Monopoly from './components/games/monopoly/Monopoly'
import AccountMenu from './components/accountmenu/AccountMenu'
import GunShop from './components/hudmenus/gunshop/GunShop';
import CarRent from './components/hudmenus/carrent/CarRent';
import Dialog from './components/hudmenus/dialog/Dialog';
import Tatoo from './components/hudmenus/tatoo/Tatoo';
import GovMenu from './components/govmenu/GovMenu';
import Bank from './components/bank/Bank'
import CircularMenu from './components/radialmenu/radialMenu';
import CurrencyExchange from './components/casino/Pages/CurrencyExchange';
import Roulette from './components/casino/Pages/Roulette';
import BlackJack from './components/casino/Pages/BlackJack';
import CarMenu from './components/carinformation/Carmenu'
import CompassPage from './components/compass/Compasspage';

function App() {
  return (
    <React.Fragment>
      <EditorMain />
      <Walkietalkie />
      <div className="box" id="box">        
        <AuthMain />
        <Inventory />
        <Phone />
        <CircularMenu />
        <AccountMenu />
        <GunShop />
        <CarRent />
        <Dialog />
        <Tatoo />
        <Hud />
        <IDCard />
        <GovMenu />
        <WorkID />
        <License />
        <Certificate />        
        <ModalInput />
        <DeathScreen />
        <Notification />
        <CarShop />
        <Bank />
        <Monopoly />
        <Quickmenu />
        <CurrencyExchange />
        <Roulette />
        <BlackJack />
        <CarMenu />
        <CompassPage />
      </div>
    </React.Fragment>
  );
}

export default App;
