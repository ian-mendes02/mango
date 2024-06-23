import {Page, Title, Subtitle} from "../../page";
export default function P1() {
    return (
        <Page className='bg-[#191918] bg-contain' style={{backgroundImage: 'url(/bg-p1.jpg)'}}>


            <div class="menu-section flex flex-col justify-evenly p-4">

                <div className="menu-item text-center py-8">
                    <img src="/svg/logo.svg" alt="" className='w-96 my-4'/>
                    <span className='text-white text-2xl font-extralight'>CAFÉ</span>
                </div>

                <div class="menu-item">
                    <Title name='Fritas' price='29,00' />
                    <p>300g de batatas fritas na hora. Acompanha molho à base de maionese e shoyu.</p>
                </div>

                <div class="menu-item">
                    <Title name='Fish & Chips' price='58,00' />
                    <p>Conhecida da Europa à Oceania por ser a combinação perfeita de iscas de peixe e fritas. Acompanha molho especial do chef.</p>
                </div>

                <div class="menu-item">
                    <Title name='Pork & Chips' price='58,00' />
                    <p>Barriga de porco marinada na cachaça. Acompanha fritas e molho barbecue chinês.</p>
                </div>

                <div class="menu-item">
                    <Title name='Long Tail' price='79,00' />
                    <p>Porção de lula, camarão empanado e iscas de peixe. Finalização especial à moda da casa.</p>
                </div>

                <div class="menu-item">
                    <Title name='Tuk-Tuk' price='60,00' />
                    <p>Uma porção de barriga de porco, beef satay e karaage de frango - chega quentinho da nossa cozinha até sua mesa, rápido como um tuk-tuk!</p>
                </div>

                <div class="menu-item">
                    <Title name='Karaage' price='29,00' />
                    <p>200g de iscas de frango empanado. Finalizado com molho tarê e gergelim.</p>
                </div>

                <div class="menu-item">
                    <Title name='Lula do Laos' price='36,00' />
                    <p>200g de lula refogada na manteiga e molho de ostra.</p>
                </div>

                <div class="menu-item">
                    <Title name='Peixe da Barraquinha' price='31,00' />
                    <p>200g de iscas de pescada branca. Acompanha molho tártaro pra dar aquele sabor de fim de semana na praia.</p>
                </div>

                <div class="menu-item">
                    <Title name='Camarão de Phi-Phi' price='73,00' />
                    <p>300g de camarão empanado ao tempero de lemon pepper. Acompanha molho de abóbora cabotiá com requeijão.</p>
                </div>

            </div>


            <div class="menu-section flex flex-col justify-evenly p-4">

                <div class="menu-item">
                    <Title name='Pastel La Carioca' />
                    <span className="text-[color:#cbad62] font-semibold">
                        <Subtitle name='4un.' price='30,00' /> / <Subtitle name='3un.' price='25,00' />
                    </span>
                    <p>Pastéis à moda carioca. Escolha entre siri, costela com queijo, caponata de berinjela ou queijo, ou um de cada! Acompanha molho de tomate feito na brasa.</p>
                </div>

                <div class="menu-item">
                    <Title name='Samosas' price='30,00' />
                    <p>3 unidades de samosas - pastéis típicos da Índia com tempero potente, textura inusitada e massa super crocante. Nossas opções de recheio são salmão, frango e ragu de carne.</p>
                </div>

                <div class="menu-item">
                    <Title name='Okashi' price='22,00' />
                    <p>3 unidades de bolinhos de costela minga, servidos com a nossa deliciosa geleia de maçã com pimenta.</p>
                </div>

                <div class="menu-item">
                    <Title name='Satay' price='19,00' />
                    <p>Espetos temperados e grelhados no autêntico estilo de comida de rua tailandesa. Escolha entre carne bovina, suína, frango ou vegetariano, se preferir. Nossa equipe pode te dar uma sugestão de molho.</p>
                </div>

                <div class="menu-item">
                    <Title name='Yakissoba' price='25,00' />
                    <p>Macarrão tipo soba, grelhado ao molho yaki com a técnica passada pelo mestre Kosaka. Temos opção de carne, frango ou vegetais.</p>
                </div>

                <div class="menu-item">
                    <Title name='Pad Thai' price='25,00' />
                    <p>O prato nacional da Tailândia, com ingredientes importados de Bangkok direto pra sua mesa. Se preferir, peça sem pimenta.</p>
                </div>

                <div class="menu-item">
                    <Title name='Sukón' price='18,00' />
                    <p>O Mango traz pra você esse prato que faz sucesso em botecos pelo mundo afora. 3 bolinhos de carne, queijo ou salmão, servidos na tábua de degustação com todo o carinho e capricho do chef.</p>
                </div>

                <div class="menu-section flex flex-col justify-evenly">

                    <h2 className='text-center mango-neon-orange uppercase my-8'>De Inverno</h2>
                    
                    <div class="menu-item">
                        <Title name='Curry de Frango' price='30,00' />
                        <p>Receita indiana adaptada ao nosso paladar brasileiro. Uma mistura de temperos exóticos pra dar aquela esquentada, na medida certa. Acompanha bolinho de arroz mochi pra ajudar a segurar o calor.</p>
                    </div>

                    <div class="menu-item">
                        <Title name='Gyudon' price='25,00' />
                        <p>Um reconfortante prato japonês interpretado pelo nosso chef. Arroz no estilo risoto com costela desfiada e especiarias, tudo bem quentinho.</p>
                    </div>

                </div>
            </div>
        </Page>
    );
}