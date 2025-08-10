import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Zap, ArrowRight, ArrowLeft, Clock, Heart, Brain, Target, Lightbulb, TrendingUp, Briefcase } from "lucide-react";

const Wiscar = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [timeSpent, setTimeSpent] = useState(0);

  const wiscarDimensions = [
    {
      id: "will",
      title: "Will",
      icon: Heart,
      description: "Motivation, persistence, and drive",
      question: "How would you rate your motivation and persistence when facing challenging technical problems?",
      details: "This measures your intrinsic motivation, grit, and determination to persevere through difficult learning curves and complex problem-solving scenarios."
    },
    {
      id: "interest", 
      title: "Interest",
      icon: Zap,
      description: "Genuine passion and career relevance",
      question: "How interested are you in pursuing cybersecurity and ethical hacking as a career path?",
      details: "This evaluates your genuine enthusiasm for the field, beyond just curiosity, and how well it aligns with your long-term career aspirations."
    },
    {
      id: "skill",
      title: "Skill",
      icon: Target,
      description: "Current technical capabilities",
      question: "How would you assess your current technical skills in networking, programming, and security concepts?",
      details: "This measures your existing foundational skills in areas critical to ethical hacking: networking, programming logic, system administration, and security fundamentals."
    },
    {
      id: "cognitive",
      title: "Cognitive Readiness", 
      icon: Brain,
      description: "Learning capacity and reasoning ability",
      question: "How confident are you in your ability to learn complex technical concepts and apply logical reasoning?",
      details: "This assesses your cognitive capacity for abstract thinking, pattern recognition, and ability to understand complex technical systems and relationships."
    },
    {
      id: "ability",
      title: "Ability to Learn",
      icon: TrendingUp, 
      description: "Adaptability and growth potential",
      question: "How quickly do you typically adapt to new technologies and incorporate feedback?",
      details: "This evaluates your growth mindset, adaptability to new tools and methodologies, and responsiveness to feedback and continuous learning."
    },
    {
      id: "realworld",
      title: "Real-World Alignment",
      icon: Briefcase,
      description: "Career goals and role awareness", 
      question: "How well do you understand the day-to-day responsibilities and career opportunities in ethical hacking?",
      details: "This measures your realistic understanding of the profession, career trajectories, job market, and how well ethical hacking aligns with your lifestyle and goals."
    }
  ];

  const handleRatingChange = (dimensionId: string, value: number[]) => {
    setRatings(prev => ({
      ...prev,
      [dimensionId]: value[0]
    }));
  };

  const isComplete = wiscarDimensions.every(dimension => ratings[dimension.id] !== undefined);
  const averageScore = isComplete 
    ? Object.values(ratings).reduce((sum, score) => sum + score, 0) / wiscarDimensions.length 
    : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Strong";
    if (score >= 60) return "Moderate";
    return "Developing";
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
              <Zap className="h-8 w-8 text-primary cyber-glow" />
              <div>
                <h1 className="text-xl font-bold">WISCAR Framework Analysis</h1>
                <p className="text-sm text-muted-foreground">Holistic fit assessment</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Clock className="h-4 w-4 mr-2" />
                {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </Badge>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {Object.keys(ratings).length}/{wiscarDimensions.length}
                </span>
                <Progress value={(Object.keys(ratings).length / wiscarDimensions.length) * 100} className="w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Introduction */}
        <Card className="question-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Zap className="h-8 w-8 text-primary mr-3 cyber-glow" />
              WISCAR Framework Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-lg">
              The WISCAR framework provides a holistic evaluation of your readiness for ethical hacking by 
              assessing six critical dimensions. Rate yourself honestly on each dimension using the sliders below.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm">
                <strong>Instructions:</strong> Move each slider to reflect your honest self-assessment. 
                There are no right or wrong answers - this helps us understand your current profile and readiness.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* WISCAR Dimensions */}
        <div className="space-y-8 mb-8">
          {wiscarDimensions.map((dimension) => {
            const Icon = dimension.icon;
            const currentRating = ratings[dimension.id] || 0;
            
            return (
              <Card key={dimension.id} className="question-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start justify-between">
                    <div className="flex items-start">
                      <Icon className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span>{dimension.title}</span>
                          {currentRating > 0 && (
                            <Badge variant="outline" className={getScoreColor(currentRating)}>
                              {currentRating}/100 - {getScoreLabel(currentRating)}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground font-normal">
                          {dimension.description}
                        </p>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm mb-4 leading-relaxed">{dimension.question}</p>
                    <div className="space-y-4">
                      <Slider
                        value={[currentRating]}
                        onValueChange={(value) => handleRatingChange(dimension.id, value)}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Low (0)</span>
                        <span>Moderate (50)</span>
                        <span>High (100)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 border border-muted rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">{dimension.details}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Overall Score Preview */}
        {isComplete && (
          <Card className="question-card mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 text-primary mr-3" />
                Overall WISCAR Score Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Average Score</span>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
                    {averageScore.toFixed(1)}/100
                  </span>
                  <p className={`text-sm ${getScoreColor(averageScore)}`}>
                    {getScoreLabel(averageScore)} Fit
                  </p>
                </div>
              </div>
              <Progress value={averageScore} className="h-3 mb-4" />
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <div className="text-destructive font-semibold">0-59</div>
                  <div className="text-muted-foreground">Developing</div>
                </div>
                <div>
                  <div className="text-warning font-semibold">60-79</div>
                  <div className="text-muted-foreground">Moderate</div>
                </div>
                <div>
                  <div className="text-primary font-semibold">80-100</div>
                  <div className="text-muted-foreground">Strong</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dimension Breakdown */}
        {Object.keys(ratings).length > 0 && (
          <Card className="question-card mb-8">
            <CardHeader>
              <CardTitle>Your WISCAR Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wiscarDimensions.map((dimension) => {
                  const Icon = dimension.icon;
                  const score = ratings[dimension.id];
                  
                  if (!score) return null;
                  
                  return (
                    <div key={dimension.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{dimension.title}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={score} className="w-24 h-2" />
                        <span className={`text-sm font-semibold ${getScoreColor(score)} min-w-[60px] text-right`}>
                          {score}/100
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/technical')}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Technical Assessment
          </Button>
          
          <div className="flex items-center space-x-4">
            {!isComplete && (
              <span className="text-sm text-muted-foreground">
                Please complete all dimensions to continue
              </span>
            )}
            <Button 
              size="lg" 
              className="cyber-glow"
              onClick={() => navigate('/results')}
              disabled={!isComplete}
            >
              View Results & Recommendations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wiscar;