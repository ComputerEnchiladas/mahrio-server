/*
Adafruit Arduino - Lesson 15. Bi-directional Motor
https://learn.adafruit.com/adafruit-arduino-lesson-15-dc-motor-reversing/lm293d
https://learn.adafruit.com/adafruit-arduino-lesson-15-dc-motor-reversing/arduino-code

*/
 
int enablePin = 11;
int in1Pin = 10;
int in2Pin = 9;
 
void setup()
{
  pinMode(in1Pin, OUTPUT);
  pinMode(in2Pin, OUTPUT);
}
 
void loop()
{
  int speed = 250;
  setMotor(speed, true);
}
 
void setMotor(int speed, boolean reverse)
{
  analogWrite(enablePin, speed);
  digitalWrite(in1Pin, ! reverse);
  digitalWrite(in2Pin, reverse);
}
