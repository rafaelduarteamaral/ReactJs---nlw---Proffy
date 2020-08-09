import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PagHeader from '../../components/PagHeader';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {

  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [bio, setBio] = useState();
  const [subject, setSubject] = useState();
  const [cost, setCost] = useState();
  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: '',
      to: ''
    }
  ]);
  const history = useHistory();

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '',
        to: ''
      }
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItens = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItens)
  } 

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!');
      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!');
    });
  
  }

  return(
    <div id="page-teacher-form" className="container">
      <PagHeader 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
              <Input name="name" label="Nome Completo" value={name} onChange={(e:any) => { setName(e.target.value) }} />
              <Input name="avatar" label="Avatar" value={avatar} onChange={(e:any) => { setAvatar(e.target.value) }}/>
              <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e:any) => { setWhatsapp(e.target.value) }}/>
              <Textarea name="bio" label="Biografia" value={bio} onChange={(e:any) => { setBio(e.target.value) }}/>
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
              <Select 
                name="subject" 
                label="Máteria"
                value={subject} onChange={(e:any) => { setSubject(e.target.value) }}
                options={[
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Biologia', label: 'Biologia' },
                  { value: 'Ciencias', label: 'Ciencias' },
                  { value: 'Educação Fisica', label: 'Educação Fisica' },
                  { value: 'Historia', label: 'Historia' },
                  { value: 'Matemática', label: 'Matemática' },
                  { value: 'Português', label: 'Português' },
                  { value: 'Química', label: 'Química' }
                ]}/>
              <Input name="cost" label="Custo da sua hora por aula"  value={cost} onChange={(e:any) => { setCost(e.target.value) }}/>
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}> + Novo horário</button>
            </legend>
            
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select 
                      name="week_day" 
                      label="Dia da semana"
                      onChange={ (e:any) => setScheduleItemValue(index, 'week_day', e.target.value) }
                      value={scheduleItem.week_day}
                      options={[
                        { value: '0', label: 'Domingo-feira' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sabado-feira' },
                      ]}/>
                  <Input name="from" label="Das" type="time" value={scheduleItem.from} onChange={ (e:any) => setScheduleItemValue(index, 'from', e.target.value) }/>
                  <Input name="to" label="Até" type="time" value={scheduleItem.to}  onChange={ (e:any) => setScheduleItemValue(index, 'to', e.target.value) }/>
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={ warningIcon } alt="Aviso importante"/>
              Importante ! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar o cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  ); 
}

export default TeacherForm;
