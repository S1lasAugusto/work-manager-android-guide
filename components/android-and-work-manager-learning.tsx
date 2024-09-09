"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"

const androidConcepts = [
  {
    title: "O que é Android?",
    content: "Android é um sistema operacional de código aberto, baseado em Linux, projetado principalmente para dispositivos móveis, como smartphones e tablets. Ele é desenvolvido pelo Google e permite que desenvolvedores criem aplicativos usando Java, Kotlin ou C++."
  },
  {
    title: "Arquitetura do Android",
    content: "A arquitetura do Android consiste em várias camadas: Kernel Linux, Camada de Abstração de Hardware (HAL), Android Runtime, Bibliotecas Nativas C/C++, Framework API Java e Aplicativos do Sistema. Essa abordagem em camadas proporciona um ambiente robusto e flexível para o desenvolvimento de aplicativos."
  },
  {
    title: "Componentes Principais",
    content: "Os aplicativos Android são construídos utilizando vários componentes: Atividades (telas de interface), Serviços (operações em segundo plano), Receptores de Broadcast (ouvintes de broadcast de sistema) e Provedores de Conteúdo (gerenciamento de dados). Compreender esses componentes é crucial para o desenvolvimento eficaz."
  },
  {
    title: "Android Studio",
    content: "O Android Studio é o Ambiente de Desenvolvimento Integrado (IDE) oficial para o desenvolvimento de aplicativos. Ele oferece ferramentas para codificação, depuração, otimização de desempenho e testes, tornando-se uma ferramenta essencial para desenvolvedores."
  },
  {
    title: "Bibliotecas Jetpack",
    content: "O Android Jetpack é um conjunto de bibliotecas, ferramentas e orientações arquiteturais que ajudam os desenvolvedores a construir aplicativos de alta qualidade mais facilmente. Ele inclui componentes para design de interface, gerenciamento de dados, processamento em segundo plano (como o WorkManager), e mais."
  }
]

const basicWorkManagerConcepts = [
  {
    title: "O que é WorkManager?",
    content: "O WorkManager é uma biblioteca do Android Jetpack que facilita o agendamento de tarefas adiáveis e assíncronas que devem ser executadas, mesmo se o aplicativo for fechado ou o dispositivo reiniciar. É a solução recomendada para trabalhos persistentes."
  },
  {
    title: "Quando usar o WorkManager",
    content: "Use o WorkManager para tarefas que precisam ser executadas de forma confiável, como enviar logs para um servidor, sincronizar dados do aplicativo com o servidor periodicamente ou realizar limpeza de banco de dados."
  },
  {
    title: "Componentes Principais",
    content: "O WorkManager é composto por vários componentes principais: Worker (define o trabalho real), WorkRequest (representa uma solicitação para executar o trabalho), e WorkManager (agenda e executa suas WorkRequests)."
  },
  {
    title: "Tipos de Trabalho",
    content: "O WorkManager suporta tarefas únicas (OneTimeWorkRequest) e periódicas (PeriodicWorkRequest). Você também pode definir restrições para quando o trabalho deve ser executado, como exigir conectividade de rede ou um certo nível de bateria."
  },
  {
    title: "Execução Garantida",
    content: "O WorkManager garante que suas tarefas sejam executadas, mesmo se o aplicativo for fechado ou o dispositivo reiniciar. Ele usa várias tecnologias subjacentes, como JobScheduler, AlarmManager e Serviços em Primeiro Plano para atingir esse objetivo."
  }
]

type Step = {
  question: string
  options: {
    text: string
    nextStep: string | null
    explanation?: string
  }[]
}

const steps: Record<string, Step> = {
  start: {
    question: "Você precisa realizar tarefas em segundo plano no seu aplicativo Android?",
    options: [
      { text: "Sim", nextStep: "deferrable" },
      { text: "Não", nextStep: "end", explanation: "O WorkManager é usado principalmente para tarefas em segundo plano. Se você não precisa de processamento, talvez o WorkManager não seja necessário." }
    ]
  },
  deferrable: {
    question: "Essas tarefas podem ser adiadas e/ou exigem execução garantida?",
    options: [
      { text: "Sim", nextStep: "constraints" },
      { text: "Não", nextStep: "immediate", explanation: "Para tarefas imediatas e de curta duração, considere usar corrotinas Kotlin ou RxJava." }
    ]
  },
  constraints: {
    question: "Você precisa executar tarefas sob restrições específicas (por exemplo, disponibilidade de rede, nível de bateria)?",
    options: [
      { text: "Sim", nextStep: "periodic" },
      { text: "Não", nextStep: "periodic" }
    ]
  },
  periodic: {
    question: "Você precisa executar tarefas periódicas?",
    options: [
      { text: "Sim", nextStep: "workmanager" },
      { text: "Não", nextStep: "workmanager" }
    ]
  },
  immediate: {
    question: "Você precisa realizar trabalho imediato e de curta duração em segundo plano?",
    options: [
      { text: "Sim", nextStep: "coroutines", explanation: "Para tarefas imediatas e de curta duração, corrotinas Kotlin ou RxJava podem ser mais adequadas." },
      { text: "Não", nextStep: "workmanager" }
    ]
  },
  coroutines: {
    question: "Considere usar corrotinas Kotlin para tarefas imediatas e de curta duração. Você quer explorar o WorkManager mesmo assim?",
    options: [
      { text: "Sim", nextStep: "workmanager" },
      { text: "Não", nextStep: "end", explanation: "Corrotinas Kotlin são ótimas para tarefas imediatas e de curta duração em segundo plano. Explore a documentação para mais informações." }
    ]
  },
  workmanager: {
    question: "Ótimo! O WorkManager parece ser adequado para suas necessidades. Pronto para começar a aprender?",
    options: [
      { text: "Sim", nextStep: "learn" },
      { text: "Não", nextStep: "end" }
    ]
  },
  learn: {
    question: "Qual aspecto do WorkManager você gostaria de aprender primeiro?",
    options: [
      { text: "Conceitos Básicos", nextStep: "basics" },
      { text: "Configurando o WorkManager", nextStep: "setup" },
      { text: "Criando Workers", nextStep: "workers" },
      { text: "Recursos Avançados", nextStep: "advanced" }
    ]
  },
  basics: {
    question: "Ótimo! Vamos começar com os conceitos básicos. Qual tópico mais lhe interessa?",
    options: [
      { text: "O que é WorkManager?", nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager" },
      { text: "Tipos de Solicitações de Trabalho", nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/basics#workrequest-types" },
      { text: "Restrições de Trabalho", nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/how-to/define-work#constraints" }
    ]
  },
  setup: {
    question: "Configurar o WorkManager é crucial. O que você gostaria de saber?",
    options: [
      {
        text: "Adicionando Dependências",
        nextStep: "https://developer.android.com/jetpack/androidx/releases/work"
      },
      {
        text: "Configurando o Gradle",
        nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/advanced/custom-configuration"
      },
      {
        text: "Inicializando o WorkManager",
        nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/advanced/custom-configuration"
      }
    ]
  },
  workers: {
    question: "Criar Workers é fundamental. Qual aspecto lhe interessa?",
    options: [
      {
        text: "Criando um Worker Básico",
        nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/basics#create-worker-class"
      },
      {
        text: "Implementando o doWork()",
        nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/how-to/define-work#do-work"
      },
      {
        text: "Manipulando Resultados do Trabalho",
        nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/how-to/return-values-from-workers"
      }
    ]
  },
  advanced: {
    question: "Pronto para tópicos avançados? Escolha uma área para explorar:",
    options: [
      {
        text: "Encadeamento de Trabalhos",
        nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/advanced/chain-work"
      },
      {
        text: "Trabalho Único",
        nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/how-to/unique-work"
      },
      {
        text: "Observando o Trabalho",
        nextStep: "https://developer.android.com/topic/libraries/architecture/workmanager/how-to/monitor"
      }
    ]
  },
  end: {
    question: "Obrigado por explorar o WorkManager! Gostaria de começar novamente?",
    options: [
      { text: "Sim", nextStep: "start" },
      { text: "Não", nextStep: null }
    ]
  }
}

const learningContent: Record<string, string> = {
  what_is_workmanager: "O WorkManager faz parte do Android Jetpack e fornece uma maneira fácil de agendar tarefas adiáveis e assíncronas que devem ser executadas, mesmo que o aplicativo seja fechado ou o dispositivo reinicie.",
  work_requests: "O WorkManager suporta OneTimeWorkRequest para tarefas únicas e PeriodicWorkRequest para tarefas recorrentes. Ambos os tipos permitem definir restrições e atrasos.",
  constraints_learn: "As Restrições de Trabalho permitem especificar as condições sob as quais seu trabalho deve ser executado, como disponibilidade de rede, nível de bateria ou espaço de armazenamento.",
  dependencies: "Para usar o WorkManager, adicione a seguinte dependência ao arquivo build.gradle do seu aplicativo: implementation 'androidx.work:work-runtime-ktx:2.8.1'",
  gradle: "Certifique-se de que o arquivo build.gradle do seu projeto esteja configurado corretamente, incluindo a versão mínima do SDK e as dependências necessárias para o WorkManager.",
  initialize: "O WorkManager é inicializado automaticamente na maioria dos casos, mas você pode personalizar a inicialização implementando a interface Configuration.Provider.",
  basic_worker: "Um Worker básico estende a classe Worker e implementa o método doWork(), que é onde a lógica de sua tarefa em segundo plano é definida.",
  do_work: "O método doWork() é chamado pelo WorkManager para realizar a tarefa. Ele deve retornar um Result, indicando o sucesso ou falha da operação.",
  work_results: "O WorkManager pode retornar três tipos de Result: success(), failure(), ou retry(), dependendo do resultado da tarefa.",
  chaining: "O encadeamento de trabalhos permite que você execute várias tarefas em uma sequência, onde o próximo trabalho só começa se o anterior tiver sucesso.",
  unique_work: "Trabalho único garante que apenas uma instância de uma tarefa específica seja executada por vez. Você pode escolher substituir ou manter o trabalho existente.",
  observing: "Você pode observar o estado do trabalho usando LiveData ou callbacks, permitindo que seu aplicativo reaja a mudanças no progresso ou resultados da tarefa."
}

export function AndroidAndWorkManagerLearning() {
  const [currentView, setCurrentView] = useState<"android" | "workmanager-intro" | "workmanager-tree">("android")
  const [currentStep, setCurrentStep] = useState("start")
  const [history, setHistory] = useState<string[]>([])
  const [learningPath, setLearningPath] = useState<string[]>([])

  const handleOption = (nextStep: string | null, explanation?: string) => {
    if (typeof nextStep === 'string' && nextStep.startsWith('http')) {
      handleRedirect(nextStep);
    } else if (nextStep) {
      setHistory([...history, currentStep]);
      setCurrentStep(nextStep);
      if (explanation) {
        setLearningPath([...learningPath, explanation]);
      }
    }
  };

  const handleRedirect = (url: string) => {
    window.open(url, '_blank');
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousStep = history[history.length - 1]
      setCurrentStep(previousStep)
      setHistory(history.slice(0, -1))
    } else if (currentView === "workmanager-tree") {
      setCurrentView("workmanager-intro")
    } else if (currentView === "workmanager-intro") {
      setCurrentView("android")
    }
  }

  const resetTree = () => {
    setCurrentStep("start")
    setHistory([])
    setLearningPath([])
    setCurrentView("android")
  }

  const step = steps[currentStep]

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      {currentView === "android" && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">Introdução à Programação Android</h1>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Visão Geral do Desenvolvimento Android</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                A programação Android é o processo de criar aplicações para dispositivos que utilizam o sistema operacional Android.
                Antes de mergulharmos em tópicos específicos como o WorkManager, vamos revisar alguns conceitos fundamentais do desenvolvimento Android:
              </p>
              {androidConcepts.map((concept, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg">{concept.title}</h3>
                  <p>{concept.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pronto para Explorar o WorkManager?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Agora que você tem uma compreensão básica do desenvolvimento Android, vamos explorar o WorkManager,
                uma ferramenta poderosa para gerenciar tarefas em segundo plano em aplicativos Android.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setCurrentView("workmanager-intro")} className="w-full">
                Começar Experiência de Aprendizado do WorkManager
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </>
      )}

      {currentView === "workmanager-intro" && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">Introdução ao WorkManager</h1>
          <Card>
            <CardHeader>
              <CardTitle>Noções Básicas sobre o WorkManager</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Antes de começarmos seu caminho de aprendizado personalizado, vamos revisar alguns conceitos básicos sobre o WorkManager:</p>
              {basicWorkManagerConcepts.map((concept, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg">{concept.title}</h3>
                  <p>{concept.content}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar à Introdução ao Android
              </Button>
              <Button onClick={() => setCurrentView("workmanager-tree")}>
                Iniciar seu Caminho de Aprendizado
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </>
      )}

      {currentView === "workmanager-tree" && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">Caminho de Aprendizado do WorkManager</h1>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{step.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {step.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleOption(option.nextStep, option.explanation)}
                    className="justify-start"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    {option.text}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button variant="outline" onClick={resetTree}>
                Reiniciar
              </Button>
            </CardFooter>
          </Card>
          {learningContent[currentStep] && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Conteúdo de Aprendizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{learningContent[currentStep]}</p>
              </CardContent>
            </Card>
          )}
          {learningPath.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Seu Caminho de Aprendizado</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {learningPath.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
