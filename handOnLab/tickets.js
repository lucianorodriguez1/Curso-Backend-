const events = [];

class TicketManager {
  constructor(name, place, price, ability,date) {
    this.name = name;
    this.place = place;
    this.price = price
    this.ability = ability;
    this.date = date;
  }

  static profitBasePrice = 0.15;
  static idEvent = 0;

    getEvents(){
        return events;
    }

    addEvent(ev){
        if(!ev.ability)ev.ability = 50;
        if(!ev.date)ev.date = new Date();
        ev.price += TicketManager.profitBasePrice;
        if(!ev.id && !ev.participantes){
            ev.id=TicketManager.idEvent+=1;
            ev.participantes = [];
        }
        events.push(ev);
    }

    addUser(idEvent,idUser){
        const event= events.find((e)=>e.id==idEvent)
        if(!event){
            console.log("El evento introducido no existe");
        }else if(event.participantes.includes(idUser)){
            console.log(`El participante con ID: ${idUser} ya existe`);
        }else{
            event.participantes.push(idUser);
            console.log(`Participante con ID: ${idUser} fue agregado con éxito`);
        }
    }

    putEventOnTour(idEvent,newPlace){
        const eventExisting = events.find((e)=>e.id == idEvent);
        const newEvent = {...eventExisting};

        newEvent.id = TicketManager.idEvent+=1;
        newEvent.place = newPlace;
        newEvent.date = new Date();
        newEvent.participantes = [];

        events.push(newEvent);
    }
}

const class1 = new TicketManager();

const event1 = {
    name:"concierto",
    place:"Lugano",
    price:400,
    ability:34
}
const event2 = {
    name:"cena",
    place:"Flores",
    price:100,
    ability:34
}

class1.addEvent(event1);
class1.addEvent(event2);


class1.addUser(1,346);
class1.addUser(1,3200);
class1.addUser(1,3200);

class1.putEventOnTour(1,"CABA");


console.log(class1.getEvents());
