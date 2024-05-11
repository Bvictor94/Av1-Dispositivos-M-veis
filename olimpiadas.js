import React, { useState } from 'react';
import { Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';

import React, { useState } from 'react';
import { Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';

const Olimpiadas = () => {
  const [requestedCountry, setRequestedCountry] = useState('');
  const [medalhas, setMedalhas] = useState(null);
  const [error, setError] = useState('');

  const buscarMedalhas = () => {
    axios.get('http://localhost:3000/')
      .then(response => {
        const data = response.data;

        const medalhasPais = data.filter(athlete => athlete.country === requestedCountry);
        
        if (medalhasPais.length === 0) {
          setError('País não existe ou nunca conquistou uma medalha');
          setMedalhas(null);
        } else {
          let totalOuro = 0;
          let totalPrata = 0;
          let totalBronze = 0;

          medalhasPais.forEach(athlete => {
            totalOuro += athlete.gold;
            totalPrata += athlete.silver;
            totalBronze += athlete.bronze;
          });

          setMedalhas({ ouro: totalOuro, prata: totalPrata, bronze: totalBronze });
          setError('');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar medalhas:', error);
        setError('Erro ao buscar medalhas.');
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Diga qual país você deseja saber quantas medalhas possui: </Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setRequestedCountry(text)}
        value={requestedCountry}
      />
      <Button title="Buscar" onPress={buscarMedalhas} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      {medalhas && (
        <View>
          <Text>Ouro: {medalhas.ouro}</Text>
          <Text>Prata: {medalhas.prata}</Text>
          <Text>Bronze: {medalhas.bronze}</Text>
        </View>
      )}
    </View>
  );
};

export default Olimpiadas;
