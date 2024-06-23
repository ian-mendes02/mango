import {Page, Title} from "../../page";
export default function P2() {
    return (
        <Page className='bg-[#191918] bg-contain' style={{backgroundImage: 'url(/bg-p2.jpg)'}}>


            <div className="menu-section flex flex-col justify-evenly">

                <div className="menu-item text-center py-8">
                <img src="/svg/logo.svg" alt="" className='w-96 my-4'/>
                    <span className='text-white text-2xl font-extralight'>SUSHI BAR</span>
                </div>

                <div className="menu-item">

                    <div className="menu-item mb-4">
                        <span className='mango-neon-orange text-xl font-extralight mb-8'>COMBINADOS</span>
                        <p>Peças variadas de harumaki, joe, nigiri, hossomaki, sashimi e hot roll. Tudo isso naquele jeitinho brasileiro que deixa tudo mais gostoso.</p>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <Title name="JUU" price="55,00" />
                            <p>15 peças</p>
                            <Title name="NI-JUU" price="126,00" />
                            <p>25 peças</p>
                            <Title name="SAN-JUU" price="180,00" />
                            <p>50 peças</p>
                        </div>
                        <img src="/pratos/combinados.webp" alt="" width={150} height={150} />
                    </div>
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Ceviche" price="32,00" />
                        <p>Pescada branca, lula, camarão e polvo, cozidos na acidez do suco de limão. Esse tesouro das ilhas do Pacífico é servido com um molho à base de limão chamado leche de tigre. Acompanha chips de batata doce.</p>
                    </div>
                    <img src="/pratos/ceviche.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Salmão tartare" price="39,00" />
                        <p>O prato mais pedido aqui no Mango - e com razão. Nosso salmão tartare é feito com cubos de salmão fresco sobre uma cama de avocado temperado, cobertos de tobiko, um caviar japonês.</p>
                    </div>
                    <img src="/pratos/tartare.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Carpaccio" price="49,00" />
                        <p>Lâminas de salmão ao molho ponzu - um molho japonês levemente picante à base de shoyu, sakê, mirin e suco de limão. Servido com ovas e gergelim.</p>
                    </div>
                    <img src="/pratos/carpaccio.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>
            </div>


            <div className="menu-section">

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Joe Sushi" price="25,00" />
                        <p>6 peças de joe sushi - gohan enrolado em uma lasca de sashimi. Você escolhe seu recheio favorito:</p>
                        <ul>
                            <li>Salmão</li>
                            <li>Camarão</li>
                            <li>Salmão Philadelphia</li>
                        </ul>
                    </div>
                    <img src="/pratos/joe_sushi.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Hossomaki" price="23,00" />
                        <p>6 peças de hossomaki - o sushi mais icônico do mundo. Escolha seu recheio preferido:</p>
                        <ul>
                            <li>Atum</li>
                            <li>Salmão com ovas</li>
                            <li>Camarão Philadelphia</li>
                        </ul>
                    </div>
                    <img src="/pratos/hossomaki.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Uramaki" price="23,00" />
                        <p>5 peças de uramaki - um estilo ocidental de sushi "às avessas", enrolado com gohan e recheado com ingredientes à escolha do chef.</p>
                    </div>
                    <img src="/pratos/uramaki.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Nigiri" price="28,00" />
                        <p>6 peças de nigiri - porções de gohan cuidadosamente moldadas à mão, cobertas com lascas de sashimi de atum, tilápia e salmão.</p>
                    </div>
                    <img src="/pratos/nigiri.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Hot Roll" price="25,00" />
                        <p>5 peças de hot roll - sushi empanado e frito que costuma agradar quem não curte sushi. O recheio fica a sua escolha:</p>
                        <ul>
                            <li>Atum</li>
                            <li>Salmão</li>
                            <li>Camarão</li>
                        </ul>
                    </div>
                    <img src="/pratos/hot_roll.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Temaki" price="58,00" />
                        <p>Um cone de gohan enrolado em nori crocante. Nossas opções de recheio:</p>
                        <ul>
                            <li>Atum</li>
                            <li>Salmão (grelhado opcional)</li>
                            <li>Salmão Philadelphia</li>
                        </ul>
                    </div>
                    <img src="/pratos/temaki.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Tuna Tataki" price="34,90" />
                        <p>5 lâminas de atum marinado, grelhado e empanado com furikake. Servido com molho à base de ostras, pimenta, gergelim e limão.</p>
                    </div>
                    <img src="/pratos/tuna_tataki.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>

                <div className="menu-item grid grid-cols-[70%_30%]">
                    <div className='pr-4'>
                        <Title name="Pedra de Sal" price="34,90" />
                        <p>Carpaccio de salmão ou tilápia, regado com azeite trufado, raspas de limão siciliano e servido em uma pedra de sal maciço.</p>
                    </div>
                    <img src="/pratos/pedra_de_sal.webp" alt="" width={100} height={100} className='w-full mt-auto mb-0' />
                </div>
            </div>
        </Page>
    );
}