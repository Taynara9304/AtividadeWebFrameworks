import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  StatusBar, 
  Platform,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState({
    city: 'São Paulo',
    temperature: 18,
    condition: 'Cloudy',
    time: '10:15',
    date: 'Mon, 10 May',
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
  });

  const [forecast, setForecast] = useState([
    { day: 'TUE', icon: 'partly-cloudy-day', high: 19, low: 15 },
    { day: 'WED', icon: 'sunny', high: 23, low: 18 },
    { day: 'THU', icon: 'cloudy', high: 20, low: 16 },
    { day: 'FRI', icon: 'rainy', high: 17, low: 13 },
    { day: 'SAT', icon: 'partly-cloudy-day', high: 21, low: 17 },
    { day: 'SUN', icon: 'sunny', high: 24, low: 19 },
    { day: 'MON', icon: 'cloudy', high: 21, low: 16 },
  ]);

  const [loading, setLoading] = useState(false);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'sunny': 'wb-sunny',
      'cloudy': 'cloud',
      'partly-cloudy-day': 'partly-cloudy-day',
      'rainy': 'grain',
      'thunderstorm': 'flash-on',
      'snowy': 'ac-unit',
      'windy': 'air',
      'foggy': 'cloud-queue',
    };
    return iconMap[condition] || 'wb-sunny';
  };

  // Simular carregamento de dados
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingFullScreen}>
        <LinearGradient colors={['#0c2461', '#1e3799', '#4a69bd']} style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando dados meteorológicos...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" backgroundColor="#0c2461" />
      <LinearGradient
        colors={['#0c2461', '#1e3799', '#4a69bd']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        >
          {/* Cabeçalho com data e hora */}
          <View style={styles.header}>
            <Text style={styles.timeText}>{currentWeather.time}</Text>
            <Text style={styles.dateText}>{currentWeather.date}</Text>
          </View>

          {/* Localização atual */}
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={28} color="#fff" />
            <Text style={styles.cityText}>{currentWeather.city}</Text>
          </View>

          {/* Temperatura atual e condição */}
          <View style={styles.currentWeatherContainer}>
            <View style={styles.temperatureContainer}>
              <Text style={styles.temperatureText}>{currentWeather.temperature}°</Text>
              <Text style={styles.celsiusText}>C</Text>
            </View>
            <Text style={styles.conditionText}>{currentWeather.condition}</Text>
          </View>

          {/* Ícone do clima atual */}
          <View style={styles.weatherIconContainer}>
            <MaterialIcons name={getWeatherIcon('cloudy')} size={140} color="#fff" />
          </View>

          {/* Informações adicionais do clima */}
          <View style={styles.weatherDetailsContainer}>
            <View style={styles.weatherDetail}>
              <MaterialIcons name="opacity" size={28} color="#fff" />
              <Text style={styles.detailValue}>{currentWeather.humidity}%</Text>
              <Text style={styles.detailLabel}>Humidade</Text>
            </View>
            
            <View style={styles.weatherDetail}>
              <MaterialIcons name="air" size={28} color="#fff" />
              <Text style={styles.detailValue}>{currentWeather.windSpeed} km/h</Text>
              <Text style={styles.detailLabel}>Vento</Text>
            </View>
            
            <View style={styles.weatherDetail}>
              <MaterialIcons name="water-drop" size={28} color="#fff" />
              <Text style={styles.detailValue}>{currentWeather.precipitation}%</Text>
              <Text style={styles.detailLabel}>Precipitação</Text>
            </View>
          </View>

          {/* Previsão para os próximos dias */}
          <View style={styles.forecastContainer}>
            <Text style={styles.forecastTitle}>PREVISÃO PARA 7 DIAS</Text>
            <View style={styles.forecastDaysContainer}>
              {forecast.map((day, index) => (
                <View key={index} style={styles.forecastDay}>
                  <Text style={styles.forecastDayText}>{day.day}</Text>
                  <MaterialIcons 
                    name={getWeatherIcon(day.icon)} 
                    size={36} 
                    color="#fff" 
                  />
                  <View style={styles.temperatureRange}>
                    <Text style={styles.highTemp}>{day.high}°</Text>
                    <Text style={styles.lowTemp}>{day.low}°</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Mais informações adicionais */}
          <View style={styles.additionalInfoContainer}>
            <Text style={styles.additionalInfoTitle}>CONDIÇÕES ATUAIS DETALHADAS</Text>
            <View style={styles.additionalInfoGrid}>
              <View style={styles.infoItem}>
                <MaterialIcons name="wb-twilight" size={28} color="#fff" />
                <Text style={styles.infoLabel}>Nascer do sol</Text>
                <Text style={styles.infoValue}>06:15 AM</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="nightlight" size={28} color="#fff" />
                <Text style={styles.infoLabel}>Pôr do sol</Text>
                <Text style={styles.infoValue}>18:45 PM</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="compress" size={28} color="#fff" />
                <Text style={styles.infoLabel}>Pressão</Text>
                <Text style={styles.infoValue}>1013 hPa</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="visibility" size={28} color="#fff" />
                <Text style={styles.infoLabel}>Visibilidade</Text>
                <Text style={styles.infoValue}>10 km</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="thermostat" size={28} color="#fff" />
                <Text style={styles.infoLabel}>Sensação térmica</Text>
                <Text style={styles.infoValue}>17°C</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="cloud" size={28} color="#fff" />
                <Text style={styles.infoLabel}>Nebulosidade</Text>
                <Text style={styles.infoValue}>85%</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="waves" size={28} color="#fff" />
                <Text style={styles.infoLabel}>Índice UV</Text>
                <Text style={styles.infoValue}>4 Moderado</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="device-thermostat" size={28} color="#fff" />
                <Text style={styles.infoLabel}>Ponto de orvalho</Text>
                <Text style={styles.infoValue}>12°C</Text>
              </View>
            </View>
          </View>

          {/* Dicas do dia */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>RECOMENDAÇÕES PARA HOJE</Text>
            <View style={styles.tipItem}>
              <MaterialIcons name="umbrella" size={24} color="#4a69bd" />
              <Text style={styles.tipText}>Leve um guarda-chuva, há 20% de chance de chuva à tarde</Text>
            </View>
            <View style={styles.tipItem}>
              <MaterialIcons name="jacket" size={24} color="#4a69bd" />
              <Text style={styles.tipText}>Use um casaco leve, temperatura amena durante o dia</Text>
            </View>
            <View style={styles.tipItem}>
              <MaterialIcons name="sunglasses" size={24} color="#4a69bd" />
              <Text style={styles.tipText}>Óculos de sol recomendados pela manhã</Text>
            </View>
          </View>

          {/* Créditos */}
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>🌤️ SISTEMA METEOROLÓGICO PREMIUM</Text>
            <Text style={styles.copyrightText}>Dados simulados para fins de demonstração</Text>
            <Text style={styles.copyrightText}>ID 169188337 © Katrink2003</Text>
            <Text style={styles.appVersion}>Versão 1.0.0 | Atualizado agora há pouco</Text>
          </View>

          {/* Espaço extra para garantir rolagem */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    height: height,
  },
  loadingFullScreen: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    minHeight: height * 1.5, // Força altura maior que a tela
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  timeText: {
    fontSize: 52,
    fontWeight: '300',
    color: '#fff',
  },
  dateText: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  cityText: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 12,
  },
  currentWeatherContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperatureText: {
    fontSize: 96,
    fontWeight: '200',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  celsiusText: {
    fontSize: 36,
    color: '#fff',
    marginTop: 15,
    fontWeight: '300',
  },
  conditionText: {
    fontSize: 28,
    color: 'rgba(255, 255, 255, 0.95)',
    marginTop: -15,
    fontWeight: '500',
  },
  weatherIconContainer: {
    marginVertical: 25,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 100,
  },
  weatherDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginVertical: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  weatherDetail: {
    alignItems: 'center',
    flex: 1,
  },
  detailValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 6,
  },
  forecastContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  forecastTitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 1,
  },
  forecastDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  forecastDay: {
    alignItems: 'center',
    width: '14%',
    marginBottom: 15,
  },
  forecastDayText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
  },
  temperatureRange: {
    flexDirection: 'row',
    marginTop: 10,
  },
  highTemp: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    marginRight: 8,
  },
  lowTemp: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  additionalInfoContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  additionalInfoTitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 1,
  },
  additionalInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    marginTop: 6,
  },
  tipsContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  tipsTitle: {
    fontSize: 18,
    color: '#0c2461',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  tipText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 15,
    flex: 1,
    lineHeight: 22,
  },
  creditsContainer: {
    marginTop: 35,
    marginBottom: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    width: '100%',
  },
  creditsText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  copyrightText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    textAlign: 'center',
  },
  appVersion: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 8,
    fontStyle: 'italic',
  },
  bottomSpacer: {
    height: 50,
  },
});

export default WeatherApp;