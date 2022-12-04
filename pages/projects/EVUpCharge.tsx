import Link from 'next/link'
import Image from 'next/image'
import PostSummary from '../components/PostSummary'

export const EVUpCharge = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="EVUp Charge"
        link="/projects/EVUpCharge"
        desc="Occupational - DD/MM/YY"
      >
        <div className="flex flex-col justify-center gap-y-4">
          <div>
            Since February 2022 to the present day, I've been employed as a Full
            Stack Engineer working on EVUp Charge, currently (as of September
            2022) acting as the lead developer of the project. The largest of
            the projects listed, EVUp Charge is a comprehensive, scalable
            software that aims to facilitate charging facilities for the
            electric vehicle boom. With clients all around Australia, it offers
            reliable monitoring, monetisation, load balancing and sharing of
            OCPP electric vehicle charging stations around the country. Since it
            is an active project, this article will be consistently updated to
            correspond with the current version.
          </div>
          <div>
            The software started as a simple website built in React, then
            evolved into a microservice architecture managed by Google Cloud
            Platform (GCP), with a GraphQL backend as well as microservices for
            charging, payments and load management. Later came an app built with
            React Native.
          </div>
          <div>
            While I cannot share any further details of the codebase, I can
            explain the extensive functionality of the software for both drivers
            and charger owners. I'm sure those who are technically familiar with
            the tools listed in the previous paragraph can infer the vague
            details of how it fits together, and I will soon provide a seperate
            article on how to architect big scalable software applications like
            this, if that's what you came here looking for. With that in mind,
            these are the solutions offered by the software.
          </div>
          <h1 className="text-2xl underline text-secondary">
            EVUp for Drivers
          </h1>
          <div>
            Drivers of electric vehicles can readily access the app or website
            and will land on a map containing all of the locations which use the
            EVUp software (online locations) as well as locations that are known
            to have chargers but are not connected to our software (offline
            locations) - similar to PlugShare, for those familiar. This can be
            seen at the{' '}
            <Link
              href="http://charge.evup.com.au/ecommerce"
              className="text-secondary"
              target="_blank"
            >
              EVUp ChargeMap
            </Link>{' '}
            page. Similarly for the app, the ChargeMap is simply accessed at the
            landing page.
          </div>
          <div className="flex flex-row">
            <Image
              src="/assets/evup/chargeMap.png"
              width={650}
              height={100}
              quality={100}
              alt="EVUp ChargeMap"
              className="bg-white border-2 border-black mx-auto rounded-lg"
            />
            <Image
              src="/assets/evup/appChargeMap.jpg"
              width={150}
              height={100}
              quality={100}
              alt="EVUp ChargeMap"
              className="bg-white border-2 border-black mx-auto rounded-lg"
            />
          </div>
          <div>
            <span className="text-secondary">Disclaimer:</span> For the rest of
            the driver section, I'll be using the app interface for reference.
            The functionality of EVUp for drivers is exactly the same on the app
            as it is on the website, except that currently on the website
            charging is <span className="underline">prepaid</span> and on the
            app charging is <span className="underline">postpaid</span>. While
            it was not my decision, I gather this is because prepaid charging is
            likely less confusing for one time users on the web app.
          </div>
          <div>
            Moving on, from the ChargeMap one can navigate to a nearby location
            and view the chargers at that location. For locations using our
            software, one can see the status of a charger (whether it is
            charging, finishing, preparing, available etc..). They can also see
            pricing details for charging and parking as well as useful
            information about the device itself such as it's{' '}
            <Link
              href="https://en.wikipedia.org/wiki/Charging_station#Standards"
              className="text-secondary"
              target="_blank"
            >
              Plug Type
            </Link>
            , Charging Rate and Model. For offline locations, we simply include
            the device details. To infer this missing data, integration of
            charging locations and their details from 3rd party sites is a major
            feature planned for 2023. An exciting upcoming feature, as it will
            result in a boom in locations and therefore usability of the
            software for drivers.
          </div>
          <div>*** IMAGE OF UI HERE</div>
          <div>
            If a charger is currently being used, you can also see live details
            about the session in progress, such as kWh consumed, the type of
            session in progress, and the live charging rate of the device. For
            mobile users who started the session, they can monitor their session
            easily from a drawer which will fix itself on the ChargeMap page.
          </div>
          <div>*** IMAGE OF UI HERE</div>
          <div>
            Drivers also have access to a menu which contains their Session
            History, Card Details, Profile Information and a link to the EVUp
            support page. These are only pertinent to the mobile app. The web
            app does have a modal, except with limited functionality - the web
            app for drivers is mostly intended for one time users who wish to
            scan the charger QR code and prepay. This intends to save the
            frustrating hastle we've all found ourselves in of spending 15
            minutes setting up account details etc, only to use the software for
            5 or 10 minutes.
          </div>
          <div>
            Currently planned additions include:
            <ul className="list-disc">
              <li>
                The addition of all globally registered charging locations.
              </li>
              <li>
                A My Vehicles page in the menu, where you can add your vehicle
                and the software will infer what charger type you need, then
                direct you to the nearest available port of that type.
              </li>
              <li>A My RFID page, improving support of RFID use for drivers</li>
            </ul>
            These changes intend to come together to offer a conclusive and
            comprehensive app that, in amalgamation with the factilies offered
            by EVUp for Chargers (Admin Portal), provides an all-in-one package
            of features for electric vehicle charging.
          </div>
        </div>
      </PostSummary>
    </div>
  )
}

export const EVUpChargeSummary = () => {
  return (
    <PostSummary
      title="EVUp Charge"
      active
      isPageHeader={false}
      children={undefined}
      link="/projects/EVUpCharge"
      desc="Large scale software aimed at connecting Australia to monitored, monetisable electric vehicle chargers"
    />
  )
}

export default EVUpCharge
