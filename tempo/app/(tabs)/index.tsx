import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  StatusBar,
  RefreshControl 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const TempoApp = () => {
  const chaveApi = 'bfcd4865eedbc31314831a698213fe6a';
  const cidade = 'Cascavel,BR';
  const urlAtual = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${chaveApi}`;
  const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&units=metric&lang=pt_br&appid=${chaveApi}`;

  const [tempo, setTempo] = useState(null);
  const [previsao, setPrevisao] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const obterIconeClima = (codigoIcone) => {
    const mapaIcones = {
      '01d': 'wb-sunny',
      '01n': 'nightlight',
      '02d': 'partly-cloudy-day',
      '02n': 'cloud',
      '03d': 'cloud',
      '03n': 'cloud',
      '04d': 'cloud',
      '04n': 'cloud',
      '09d': 'rainy',
      '09n': 'rainy',
      '10d': 'rainy',
      '10n': 'rainy',
      '11d': 'flash-on',
      '11n': 'flash-on',
      '13d': 'ac-unit',
      '13n': 'ac-unit',
      '50d': 'cloud-queue',
      '50n': 'cloud-queue',
    };
    return mapaIcones[codigoIcone] || 'wb-sunny';
  };

  const formatarData = () => {
    const agora = new Date();
    return agora.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const formatarHora = () => {
    const agora = new Date();
    return agora.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const buscarDadosTempo = async () => {
    try {
      const respostaAtual = await fetch(urlAtual);
      const dadosAtuais = await respostaAtual.json();

      const respostaPrevisao = await fetch(urlPrevisao);
      const dadosPrevisao = await respostaPrevisao.json();

      const tempoProcessado = {
        cidade: dadosAtuais.name,
        temperatura: Math.round(dadosAtuais.main.temp),
        condicao: dadosAtuais.weather[0].description,
        icone: dadosAtuais.weather[0].icon,
        umidade: dadosAtuais.main.humidity,
        velocidadeVento: Math.round(dadosAtuais.wind.speed * 3.6),
        sensacaoTermica: Math.round(dadosAtuais.main.feels_like),
        hora: formatarHora(),
        data: formatarData(),
      };

      const previsaoDiaria = {};
      dadosPrevisao.list.slice(0, 9).forEach(item => {
        const data = new Date(item.dt * 1000);
        const nomeDia = data.toLocaleDateString('pt-BR', { weekday: 'short' }).split('-')[0];
        
        if (!previsaoDiaria[nomeDia]) {
          previsaoDiaria[nomeDia] = {
            dia: nomeDia.toUpperCase(),
            icone: item.weather[0].icon,
            temperaturaMaxima: Math.round(item.main.temp_max),
            temperaturaMinima: Math.round(item.main.temp_min),
          };
        }
      });

      const arrayPrevisao = Object.values(previsaoDiaria).slice(0, 3);

      setTempo(tempoProcessado);
      setPrevisao(arrayPrevisao);

    } catch (erro) {
      setTempo({
        cidade: 'Cascavel',
        temperatura: 24,
        condicao: 'céu limpo',
        icone: '01d',
        umidade: 65,
        velocidadeVento: 10,
        sensacaoTermica: 25,
        hora: formatarHora(),
        data: formatarData(),
      });
      setPrevisao([
        { dia: 'TER', icone: '01d', temperaturaMaxima: 26, temperaturaMinima: 18 },
        { dia: 'QUA', icone: '02d', temperaturaMaxima: 25, temperaturaMinima: 19 },
        { dia: 'QUI', icone: '04d', temperaturaMaxima: 23, temperaturaMinima: 17 },
      ]);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  const aoAtualizar = () => {
    setAtualizando(true);
    buscarDadosTempo();
  };

  useEffect(() => {
    buscarDadosTempo();
  }, []);

  if (carregando) {
    return (
      <LinearGradient colors={['#0c2461', '#1e3799']} style={styles.containerCarregando}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.textoCarregando}>Buscando dados de Cascavel...</Text>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0c2461" />
      <LinearGradient colors={['#0c2461', '#1e3799', '#4a69bd']} style={styles.gradiente}>
        <ScrollView 
          contentContainerStyle={styles.conteudoScroll}
          refreshControl={
            <RefreshControl refreshing={atualizando} onRefresh={aoAtualizar} tintColor="#fff" />
          }
        >
          <View style={styles.cabecalho}>
            <Text style={styles.textoHora}>{tempo?.hora}</Text>
            <Text style={styles.textoData}>{tempo?.data}</Text>
          </View>

          <View style={styles.containerLocalizacao}>
            <MaterialIcons name="location-on" size={24} color="#fff" />
            <Text style={styles.textoCidade}>{tempo?.cidade}, PR</Text>
          </View>

          <View style={styles.containerTemperatura}>
            <Text style={styles.textoTemperatura}>{tempo?.temperatura}°</Text>
            <Text style={styles.textoCondicao}>{tempo?.condicao}</Text>
          </View>

          <View style={styles.containerIcone}>
            {tempo?.icone && (
              <MaterialIcons name={obterIconeClima(tempo.icone)} size={100} color="#fff" />
            )}
          </View>

          <View style={styles.containerInformacoes}>
            <View style={styles.caixaInformacao}>
              <MaterialIcons name="opacity" size={24} color="#fff" />
              <Text style={styles.valorInformacao}>{tempo?.umidade}%</Text>
              <Text style={styles.rotuloInformacao}>Umidade</Text>
            </View>
            
            <View style={styles.caixaInformacao}>
              <MaterialIcons name="air" size={24} color="#fff" />
              <Text style={styles.valorInformacao}>{tempo?.velocidadeVento} km/h</Text>
              <Text style={styles.rotuloInformacao}>Vento</Text>
            </View>
            
            <View style={styles.caixaInformacao}>
              <MaterialIcons name="device-thermostat" size={24} color="#fff" />
              <Text style={styles.valorInformacao}>{tempo?.sensacaoTermica}°</Text>
              <Text style={styles.rotuloInformacao}>Sensação</Text>
            </View>
          </View>

          <View style={styles.containerPrevisao}>
            <Text style={styles.tituloPrevisao}>PRÓXIMOS DIAS</Text>
            <View style={styles.diasPrevisao}>
              {previsao.map((dia, indice) => (
                <View key={indice} style={styles.diaPrevisao}>
                  <Text style={styles.textoDiaPrevisao}>{dia.dia}</Text>
                  <MaterialIcons 
                    name={obterIconeClima(dia.icone)} 
                    size={30} 
                    color="#fff" 
                  />
                  <View style={styles.faixaTemperatura}>
                    <Text style={styles.temperaturaAlta}>{dia.temperaturaMaxima}°</Text>
                    <Text style={styles.temperaturaBaixa}>{dia.temperaturaMinima}°</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
  gradiente: {
    flex: 1,
  },
  conteudoScroll: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textoHora: {
    fontSize: 48,
    color: '#fff',
    fontWeight: '300',
  },
  textoData: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  containerLocalizacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  textoCidade: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  containerTemperatura: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textoTemperatura: {
    fontSize: 80,
    color: '#fff',
    fontWeight: '200',
  },
  textoCondicao: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'capitalize',
    marginTop: -10,
  },
  containerIcone: {
    marginVertical: 20,
  },
  containerInformacoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
  },
  caixaInformacao: {
    alignItems: 'center',
    flex: 1,
  },
  valorInformacao: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginTop: 5,
  },
  rotuloInformacao: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  containerPrevisao: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 25,
    marginTop: 20,
  },
  tituloPrevisao: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  diasPrevisao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  diaPrevisao: {
    alignItems: 'center',
    flex: 1,
  },
  textoDiaPrevisao: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 10,
  },
  faixaTemperatura: {
    flexDirection: 'row',
    marginTop: 8,
  },
  temperaturaAlta: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginRight: 5,
  },
  temperaturaBaixa: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default TempoApp;