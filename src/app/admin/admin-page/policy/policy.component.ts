import { ReaderOptionsComponent } from "./reader-options/reader-options.component";
import { ExceptionService } from "src/app/services/exception.service";
import { LoginService } from "src/app/services/login.service";
import { Component, Input, OnInit } from "@angular/core";
import { ModalController, Platform, PopoverController } from "@ionic/angular";
import { UserService } from "src/app/services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenAccess } from "src/app/objects/token";
import { User } from "src/app/objects/User";

@Component({
  selector: "app-policy",
  templateUrl: "./policy.component.html",
  styleUrls: ["./policy.component.scss"],
})
export class PolicyComponent implements OnInit {
  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    private popCtrl: PopoverController,
    private platform: Platform,
    private exceptionService: ExceptionService,
    public http: HttpClient
  ) {}

  text: string;
  textAux: string[];
  height: number;
  synth: any;
  voices: string[] = [];
  selectedVoice: any;
  speakText: any;
  isSpeaking: boolean;
  startIn: number;

  ngOnInit() {
    this.synth = window.speechSynthesis;
    this.show = true;
    this.height = 2.5 * this.platform.height();
    this.startIn = 20;
    this.setText();
  }

  show: boolean;
  @Input() user: User;

  back() {
    this.modalCtrl.dismiss();
  }

  selecting(checked: boolean) {
    this.show = !checked;
  }
  assinar(sign: boolean) {
    const token: TokenAccess = LoginService.getToken();
    this.pause();
    if (sign) {
      this.exceptionService.openLoading("Politica de privacidade Aceita!");
      token.user.policy = 1;
      this.userService
        .updatePolicy(token.user)
        .then(() => {
          LoginService.setToken(token);
          this.modalCtrl.dismiss();
        })
        .catch((e) => this.exceptionService.erro(e));
    } else {
      token.user.policy = 1;
      this.userService.updatePolicy(token.user);

      this.exceptionService.alertDialog(
        "Você recusou nossa política de privacidade e será redirecionado à página inicial, mas se mudar de opnião pode acessar novamente e aceitar. Tenha um exelente dia!",
        "Política não aceita",
        true
      );
    }
  }

  // async voicesOptions(ev) {
  //   const pop = await this.popCtrl.create({
  //     component: ReaderOptionsComponent,
  //     event: ev,
  //   });

  //   pop.present();

  //   const { data } = await pop.onDidDismiss();
  //   if (data) {
  //     this.selectedVoice = data.voice;
  //     const lang = this.selectedVoice.lang;
  //     // localStorage.setItem("lang", lang);
  //     window.location.reload();
  //   }
  // }

  readPolicy() {
    if (this.synth.speaking) {
      console.error("Already speaking...");
      return;
    }
    if (this.text != "") {
      //selected voice

      this.speakText = new SpeechSynthesisUtterance(this.text);
      this.speakText.voice = this.selectedVoice;
      this.speakText.onend = (e) => {
        if (this.isSpeaking) {
          if (this.startIn <= this.textAux.length) {
            this.text = this.concatText(this.startIn + 1, this.startIn + 20);
            this.startIn = Number(this.startIn + 20);
            this.readPolicy();
          }
        }
      };

      this.speakText.onstart = (e) => {
        this.isSpeaking = true;
      };
      this.speakText.onerror = (e) => {
        console.log("error" + e);
      };
      this.synth.speak(this.speakText);

      this.isSpeaking = true;
    }
  }

  pause() {
    this.isSpeaking = false;

    this.synth.pause();
  }
  concatText(init, finish) {
    let str = "";
    for (let i = init; i <= finish; i++) {
      str += " " + this.textAux[i];
    }

    return str;
  }

  async setText() {
    const str =
      "Introdução A privacidade dos visitantes do nosso sistema é muito importante para nós e estamos comprometidos em protegê-los. Esta política explica o que faremos com suas informações pessoais. 1) Informação A quem se destina essa aplicação Essa aplicação é destinada aos alunos das academias que fazem parte da Federação de Karatê da Bahia. Esses alunos são matriculados previamente pelos seus pais, caso sejam menores de idade e só após o cadastro o responsável pela academia, criará um perfil para esse aluno, o qual terá acesso ao conteúdo da plataforma. O que faremos com as informações dos usuários? Ao acessar, cadastrar ou adquirir os produtos do nosso sistema, poderemos armazenar os seguintes tipos de informações pessoais: nome completo email conta Google telefone endereço peso altura graduação foto Alguns usuários com privilégio de suporte, administrador e professor, terão acesso a algumas dessas informações dos demais usuários. O professor dos alunos, o administrador e suporte de todos os demais. Essas dados não serão comercializados com empresas de anúncios, pois o objetivo é que esses dados sejam usados para aprimoração dos participantes durante os treinos. O aplicativo provê transmissão ao vivo, desse modo, é de responsabilidade do usuário o controle das informações exibidas durante a transmissão, assim como todo conteúdo compartilhado, sendo sujeito ao banimento, caso não atenda ao que está sendo especificado nessa política de privacidade. O que são dados pessoais? A lei brasileira define dado pessoal como todo aquele que se refira a uma pessoa física identificada ou identificável. Na prática, a expressão compreende tododado que permite identificar uma pessoa ou que se relacione a uma pessoa específica. Além dos dados normalmente entendidos" +
      "como pessoais(tais como nome, endereço, data de nascimento, CPF etc.), é possível que diversos outros também o sejam, como um histórico de compras, de fotos ou de mensagens.Assim, para dizer se um dado é pessoal ou não, ocontextoé importante, de modo que um dado considerado pessoal em um caso pode não ser em outro, a depender da possibilidade ou não de se identificar uma pessoa a partir dele ou do fato de ele estar ou não vinculado a um usuário específico.Além disso, os dados pessoais podem ser sensíveis ou não.Pela LGPD, umdado sensívelé todo dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou polít dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural.Na política de privacidade, deverão ser especificados os dados dos usuários que serão tratados, incluindo informações comomomento em que são coletados, finalidades do tratamentoeprazos de armazenamento. 1.1) Mudança Quando poderemos alterar a política de informação ? Para melhor atender nossos usuários, esta política poderá ser alterada a qualquer tempo.Assim, é importante que você consulte nossa política regularmente.As alterações e esclarecimentos surtirão efeitos após sua publicação no site.Se nosso site for adquirido ou fundido com outra empresa, suas informações podem ser transferidas para os novos proprietários. 2) Consentimento Como obtemos o consentimento dos usuários ? Ao fornecer as informações pessoais por meio de cadastros, contato de e - mail ou pelo canal online(converse com a gente), inscrição em nossa newslletter, ou compras, sem habilitar identificadores anônimos, e habilitando os cookies, entendemos que você / usuários expressamente " +
      "escolhe esse tipo de navegação voltado exclusivamente aos seus interesses e, portanto, autoriza o armazenamento de informações por meio dessas tecnologias.Já, para obtermos informações pessoais para razão secundária, como marketing, solicitaremos diretamente seu consentimento ou a oportunidade de recusar o pedido. 2.1) Dados pessoais.Como faço para não compartilhar meus dados ? O Compartilhamento de seus dados é sempre uma escolha feita por você.Para que não haja compartilhamento, lembre - se que você pode ajustar a configuração de seu navegador ou seu dispositivo de acesso à internet para: Desabilitar cookies da navegação; Realizar a navegação anônima e outros; Desse modo o usuário sempre poderá optar por navegar na internet de forma a restringir a coleta de seus dados, utilizando uma das opções acima.No entanto, relativo aos dados de cadastro, apenas os usuários devidamente autenticados, terão acesso, visto a necessidade para desenvolvimento de atividades. 3) Direitos.Quais são os direitos dos usuários ? Direito de retificação das informações consentidas; Direito de acesso as informações que o sistema oferece.Direito de arrependimento do consentimento, a qualquer tempo, entrando em contato conosco através dosuporte@enginydigitaleco.com ou via whatsapp(75) 9 9231 - 6044 3.1) Das Responsabilidades  Quais são as responsabilidades dos usuários ? Dados de terceiro – o usuário deverá ter extrema cautela ao compartilhar dados do qual não seja titular.Se tiver dúvidas quanto ao consentimento desse terceiro para compartilhamento dos dados, não os compartilhe.Minha senha – Ainda que dos esforços empreendidos pela Enginy Digital - Eco para garantir a segurança dos seus dados, a utilização de serviços, o acesso a conteúdos da internet envolve alguns riscos e exposições.Assim, " +
      "é necessário que você usuário, tome alguns cuidados para reduzir os riscos: Nunca informe sua senha para terceiros; A senha é a primeira linha de defesa contra acesso não autorizado.Evite utilizar uma única senha para vários sites; Crie uma senha difícil de ser copiada com usos de caracteres, números e letras; Utilize sempre após finalizar a navegação o botão “sair” ou “logoff”; Tenha sempre atualizado o sistema operacional e o antivírus; Tenha sempre atenção quando acessar contas pessoais utilizando computadores ou redes públicas. 4) Divulgação Para quem poderemos divulgar as informações coletadas dos usuários ? As informações pessoais coletadas poderão ser divulgadas a qualquer um de nossos funcionários, a fim de gerar leads para nossos vendedores trabalharem com quem tem interesse em nossos sistemas.Ademais, as informações pessoais coletadas poderão ser divulgadas caso sejamos obrigados pela Lei para fazê - lo, ou caso o usuário viole nossos Termos de Serviços. 5) Segurança.Quais são os nossos procedimentos que garantem a privacidade e segurança dos dados dos usuários ? Para proteger as informações pessoais coletadas, seguimos as melhores práticas da indústria para nos certificar que elas não serão perdidas inadequadamente, acessadas, divulgadas, alteradas ou destruídas.Os procedimentos são: Armazenamento das informações pessoais através de servidores seguros, protegidos com senha e firewall; Ainda assim, a Enginy Digital - Eco implementa mecanismos para garantir que não haja qualquer uso indevido de seus dados; Armazenamento das informações de compra, como de cartão de crédito, por meio de criptografia, muito embora o usuário reconheça que nenhum método de transmissão pela internet ou armazenamento eletrônico é 200 % seguro, e que não podemos garantir a segurança dos " +
      "dados enviados pela internet; As transmissões de informações pela internet são criptografadas, a fim de evitar roupo de informações por interceptação.Ademais, caso o usuário suspeite de qualquer uso indevido, não deixe de entrar em contato conosco, por meio de nossos canais de atendimento disponíveis no site. 6) Legislação.Essa política é fruto da legislação vigente e de normas éticas da Enginy Digital - Eco, sempre visando o bem estar e a viabilidade dos produtos e negócios da empresa, na busca pela oferta de melhores serviços ao público.Caso haja interesse, não deixe de consultar a legislação, principalmente: Marco Civil da Internet(Lei nº 12.965 / 2014) e sua Regulamentação(Decreto nº 8.771 / 2016); Código de Defesa do Consumidor(Lei nº 8.078 / 1990); e Código Civil(Lei nº 10.406 / 2002).O que são bases legais de tratamento de dados pessoais ? Uma base legal para o tratamento de dados pessoais nada mais é que uma justificativa permitida em lei para que uma pessoa ou empresa possa tratar dados pessoais.A LGPD exige que cada atividade de tratamento seja justificada com base em um dos fundamentos previstos na lei.A base legal mais conhecida é o consentimento, que ocorre quando o usuário de um determinado site ou aplicativo concorda com as regras da plataforma quanto à utilização de seus dados.Esta não é, porém, a única justificativa permitida em lei.No caso dos dados pessoais em geral, este modelo de política de privacidade somente abrange casos em que o tratamento é realizado: mediante oconsentimento do titular dos dados pessoais(por exemplo, nos casos em que o titular concorda com a realização de determinada atividade com seus dados pessoais, clicando em um botão específica ou marcando umcheckbox); para ocumprimento de obrigação legal ou regulatória pelo controlador" +
      "(por exemplo, a Lei Federal n. 12.965 / 2014 determina que os provedores de aplicações na internet têm o dever de armazenar informações referentes à data e hora de uso de uma determinada aplicação de internet a partir de um determinado endereço IPpor seis meses, sendo que, neste caso, estes dados podem ser coletados e armazenados apenas com fundamento nesta base legal); para aexecução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados pessoais(por exemplo, nos casos em que o site ou aplicativo vende um produto que será entregue na residência do usuário, caso em que será necessário armazenar os dados da transação e alguns dados cadastrais, a fim de viabilizar o cumprimento do contrato); quando necessário para atender aosinteresses legítimos do controlador ou de terceiro(por exemplo, nos casos em que o envio demarketingdirecionado é feito com base nos interesses do controlador, desde que observados todos os requisitos da LGPD); para oexercício" +
      "regular de direitos em processo judicial, administrativo ou arbitral(por exemplo, no caso do armazenamento de transações comerciais realizadas dentro de um site ou aplicativo, até o fim do prazo prescricional de cinco anos previstos no Código de Defesa do Consumidor); para aproteção do crédito(por exemplo, nos casos em que uma instituição financeira utiliza os dados do usuário para fazer consultas embureausde crédito, a fim de evitar inadimplência).Em se tratando de dados pessoais sensíveis, este modelo considera o tratamento realizado: mediante o consentimento do titular dos dados pessoais; para o cumprimento de obrigação legal ou regulatória pelo controlador; para o exercício regular de direitos em processo judicial, administrativo ou arbitral; para a garantia da prevenção à fraude e à segurança do titular, nos processos de identificação e autenticação de cadastro em sistemas eletrônicos, resguardados os direitos do titular e exceto no caso de prevalecerem direitos e liberdades fundamentais do titular que exijam a proteção dos dados pessoais(por exemplo, nos casos em que a biometria é absolutamente necessária para garantir a segurança de determinada transação realizada no site ou no aplicativo).A lei prevê, ainda, outras bases legais.No entanto, este documento somente permite que se escolham entre as bases legais informadas nesta seção, de modo que, caso as operações de tratamento de dados pessoais realizadas pelo site ou aplicativo sejam ou devam ser justificadas com fundamento em outras bases legais não mencionadas aqui, este modelo não deve ser utilizado.No caso dos dados pessoais de crianças e adolescentes, se forem tratados, a única base legal admitida é o consentimento dos pais ou responsáveis.";

    this.textAux = str.split(" ");

    this.text = this.concatText(0, 20);

    // const lang = localStorage.getItem("lang") || "en";
    // console.log(lang);
    // const headers = new HttpHeaders({
    //   "Accept-Language": lang,
    // });
    // console.log(headers);
    // this.http
    //   .get(`${environment.API}/users/policy`, { headers: headers })
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });
  }
}
