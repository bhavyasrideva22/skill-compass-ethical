import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, Brain, ArrowRight, ArrowLeft, Clock, CheckCircle } from "lucide-react";

const Psychometric = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);

  const sections = [
    {
      title: "Interest Scale",
      description: "Evaluate your curiosity about technology and problem-solving",
      questions: [
        {
          id: "interest_1",
          text: "I enjoy solving complex puzzles and problems",
          options: [
            { value: "1", label: "Strongly Disagree" },
            { value: "2", label: "Disagree" },
            { value: "3", label: "Neutral" },
            { value: "4", label: "Agree" },
            { value: "5", label: "Strongly Agree" }
          ]
        },
        {
          id: "interest_2", 
          text: "I am curious about how technology can be broken or exploited",
          options: [
            { value: "1", label: "Strongly Disagree" },
            { value: "2", label: "Disagree" },
            { value: "3", label: "Neutral" },
            { value: "4", label: "Agree" },
            { value: "5", label: "Strongly Agree" }
          ]
        },
        {
          id: "interest_3",
          text: "I find cybersecurity concepts fascinating and engaging",
          options: [
            { value: "1", label: "Strongly Disagree" },
            { value: "2", label: "Disagree" },
            { value: "3", label: "Neutral" },
            { value: "4", label: "Agree" },
            { value: "5", label: "Strongly Agree" }
          ]
        }
      ]
    },
    {
      title: "Personality Compatibility",
      description: "Assess personality traits relevant to ethical hacking",
      questions: [
        {
          id: "personality_1",
          text: "I pay close attention to small details in my work",
          options: [
            { value: "1", label: "Never" },
            { value: "2", label: "Rarely" },
            { value: "3", label: "Sometimes" },
            { value: "4", label: "Often" },
            { value: "5", label: "Always" }
          ]
        },
        {
          id: "personality_2",
          text: "I enjoy working independently on complex problems",
          options: [
            { value: "1", label: "Never" },
            { value: "2", label: "Rarely" },
            { value: "3", label: "Sometimes" },
            { value: "4", label: "Often" },
            { value: "5", label: "Always" }
          ]
        },
        {
          id: "personality_3",
          text: "I remain calm under pressure and tight deadlines",
          options: [
            { value: "1", label: "Never" },
            { value: "2", label: "Rarely" },
            { value: "3", label: "Sometimes" },
            { value: "4", label: "Often" },
            { value: "5", label: "Always" }
          ]
        }
      ]
    },
    {
      title: "Cognitive Style & Working Preferences",
      description: "Understand your thinking patterns and work style",
      questions: [
        {
          id: "cognitive_1",
          text: "I prefer structured, methodical approaches to problem-solving",
          options: [
            { value: "1", label: "Strongly Disagree" },
            { value: "2", label: "Disagree" },
            { value: "3", label: "Neutral" },
            { value: "4", label: "Agree" },
            { value: "5", label: "Strongly Agree" }
          ]
        },
        {
          id: "cognitive_2",
          text: "I think analytically rather than creatively when solving problems",
          options: [
            { value: "1", label: "Strongly Disagree" },
            { value: "2", label: "Disagree" },
            { value: "3", label: "Neutral" },
            { value: "4", label: "Agree" },
            { value: "5", label: "Strongly Agree" }
          ]
        },
        {
          id: "cognitive_3",
          text: "I prefer working as an individual contributor rather than in teams",
          options: [
            { value: "1", label: "Strongly Disagree" },
            { value: "2", label: "Disagree" },
            { value: "3", label: "Neutral" },
            { value: "4", label: "Agree" },
            { value: "5", label: "Strongly Agree" }
          ]
        }
      ]
    },
    {
      title: "Motivation Scale",
      description: "Assess your grit, growth mindset, and motivation",
      questions: [
        {
          id: "motivation_1",
          text: "I persist even when things get very difficult",
          options: [
            { value: "1", label: "Never" },
            { value: "2", label: "Rarely" },
            { value: "3", label: "Sometimes" },
            { value: "4", label: "Often" },
            { value: "5", label: "Always" }
          ]
        },
        {
          id: "motivation_2",
          text: "I enjoy learning new skills even if they're challenging",
          options: [
            { value: "1", label: "Never" },
            { value: "2", label: "Rarely" },
            { value: "3", label: "Sometimes" },
            { value: "4", label: "Often" },
            { value: "5", label: "Always" }
          ]
        },
        {
          id: "motivation_3",
          text: "I am motivated by the ethical responsibility of protecting systems",
          options: [
            { value: "1", label: "Never" },
            { value: "2", label: "Rarely" },
            { value: "3", label: "Sometimes" },
            { value: "4", label: "Often" },
            { value: "5", label: "Always" }
          ]
        }
      ]
    }
  ];

  const currentQuestions = sections[currentSection]?.questions || [];
  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const canContinue = () => {
    return currentQuestions.every(q => answers[q.id]);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      navigate('/technical');
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      navigate('/introduction');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Brain className="h-8 w-8 text-primary cyber-glow" />
              <div>
                <h1 className="text-xl font-bold">Psychometric Assessment</h1>
                <p className="text-sm text-muted-foreground">{sections[currentSection]?.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Clock className="h-4 w-4 mr-2" />
                {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </Badge>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {answeredQuestions}/{totalQuestions}
                </span>
                <Progress value={progress} className="w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Section Header */}
        <Card className="question-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-primary mr-3 cyber-glow" />
                {sections[currentSection]?.title}
              </div>
              <Badge variant="outline">
                Section {currentSection + 1} of {sections.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg">{sections[currentSection]?.description}</p>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-8 mb-8">
          {currentQuestions.map((question, index) => (
            <Card key={question.id} className="question-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full mr-4 mt-1 flex-shrink-0">
                    {answeredQuestions > 0 && answers[question.id] ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className="leading-relaxed">{question.text}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-16">
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-3">
                        <RadioGroupItem value={option.value} id={`${question.id}_${option.value}`} />
                        <Label 
                          htmlFor={`${question.id}_${option.value}`}
                          className="cursor-pointer text-sm leading-relaxed flex-1"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Progress */}
        <Card className="question-card mb-8 bg-primary/5 border-primary/20">
          <CardContent className="py-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Section Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestions.filter(q => answers[q.id]).length}/{currentQuestions.length} completed
              </span>
            </div>
            <Progress 
              value={(currentQuestions.filter(q => answers[q.id]).length / currentQuestions.length) * 100} 
              className="h-3"
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePrevious}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            {currentSection === 0 ? 'Back to Introduction' : 'Previous Section'}
          </Button>
          
          <div className="flex items-center space-x-4">
            {!canContinue() && (
              <span className="text-sm text-muted-foreground">
                Please answer all questions to continue
              </span>
            )}
            <Button 
              size="lg" 
              className="cyber-glow"
              onClick={handleNext}
              disabled={!canContinue()}
            >
              {currentSection === sections.length - 1 ? 'Continue to Technical Assessment' : 'Next Section'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Psychometric;