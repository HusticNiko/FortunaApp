import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const common = StyleSheet.create({
  // App container
  container: {
    flex: 1,
    backgroundColor: '#f5f1e3',
  },
  // Title text
  title: {
    fontFamily: 'Georgia',
    color: '#5a3e1b',
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 64,
  },
  // Generic button
  button: {
    borderWidth: 2,
    borderColor: '#c3a574',
    backgroundColor: '#fff4dc',
    borderRadius: 12,
    paddingVertical: 32,
    paddingHorizontal: 64,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    fontFamily: 'Georgia',
    fontSize: 24,
    color: '#5a3e1b',
    textAlign: 'center',
  },
  // Spin button variant
  spinButton: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#d4b07a',
  },
  // Back button in main menu
  backButton: {
    position: 'absolute',
    bottom: 100,
    borderWidth: 2,
    borderColor: '#c3a574',
    backgroundColor: '#fff4dc',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
    zIndex: 10,
  },
  // Back button in StarrySkyMystery
  backButtonStars: {
    position: 'absolute',
    bottom: 200,
    borderWidth: 2,
    borderColor: '#c3a574',
    backgroundColor: '#fff4dc',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 24,
    zIndex: 1005,
  },
  // Fortune overlay text
  fortuneOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f1e3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  fortuneTextOverlay: {
    fontSize: 20,
    color: '#5a3e1b',
    fontWeight: 'bold',
    maxWidth: '80%',
    lineHeight: 28,
    textAlign: 'center',
  },
  tapToSpin: {
    fontSize: 28,
    color: '#7b5b3a',
    marginTop: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Quiz overlay
  quizOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  quizTitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  quizQuestion: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionBtn: {
    backgroundColor: '#fff4dc',
    borderColor: '#c3a574',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  btnText: {
    fontSize: 16,
    color: '#5a3e1b',
    textAlign: 'center',
  },
  // Warning popup
  warningPopup: {
    position: 'absolute',
    top: height / 2 - 80,
    left: 16,
    right: 16,
    backgroundColor: '#fff4dc',
    borderWidth: 2,
    borderColor: '#c3a574',
    borderRadius: 10,
    paddingVertical: 32,
    paddingHorizontal: 64,
    fontSize: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1000,
  },
  // Final reveal
  finalStage: {
    backgroundColor: '#f5f1e3',
    padding: 32,
    borderRadius: 10,
  },
  finalTitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  finalText: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
    margin: 20,
  },
  // Stepper (for multi-stage UI)
  stepper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 80,
    gap: 30,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  step: {
    alignItems: 'center',
    width: 120,
    zIndex: 2,
  },
  stepSymbol: {
    fontSize: 64,
    marginBottom: 16,
  },
  stepName: {
    fontSize: 25.6,
    marginTop: 8,
  },
  activeStep: { opacity: 1, color: '#5a3e1b', fontWeight: 'bold' },
  inactiveStep: { opacity: 0.3, color: '#a89c91' },
  connector: {
    width: 80,
    height: 6,
    backgroundColor: '#c8b188',
    marginHorizontal: 10,
    borderRadius: 4,
  },
  activeLine: { backgroundColor: '#5a3e1b' },
  inactiveLine: { backgroundColor: '#d1c3b0' },
  // Starry sky
  starrySkyWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  starrySky: { flex: 1, position: 'relative' },
  instructionText: {
    position: 'absolute',
    top: 20,
    width: '100%',
    textAlign: 'center',
    color: '#f5f1e3',
    fontSize: 18,
  },
  constellation: { position: 'absolute', width: 24, height: 24 },
  sparkle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    opacity: 0.8,
  },
});

export default common;
