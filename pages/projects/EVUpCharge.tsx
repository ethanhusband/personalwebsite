import Image from 'next/image'
import PostSummary from '../../components/PostSummary'
import { SiteLink } from '../../components/SiteLink'

export const EVUpCharge = () => {
  return (
    <div className="flex flex-col">
      <PostSummary
        title="EVUp Charge"
        link="/projects/EVUpCharge"
        desc="Occupational - Active"
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
            charging, payments and load management. Later came an{' '}
            <SiteLink href="https://apps.apple.com/sg/app/upcharge/id1636227214">
              app
            </SiteLink>{' '}
            built with React Native.
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
          <div>
            <span className="text-secondary">Disclaimer:</span> Excuse the poor
            image quality, I assure they look slicker when actually visited!
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
            <SiteLink href="http://charge.evup.com.au/ecommerce">
              EVUp ChargeMap
            </SiteLink>{' '}
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
              className="bg-white border border-black mx-auto rounded-lg"
            />
            <Image
              src="/assets/evup/appChargeMap.jpg"
              width={150}
              height={100}
              quality={100}
              alt="EVUp ChargeMap"
              className="bg-white border border-black mx-auto rounded-lg"
            />
          </div>
          <div>
            <span className="text-secondary">Note:</span> For the rest of the
            driver section, I'll be using the app interface for reference. The
            functionality of EVUp for drivers is exactly the same on the app as
            it is on the website, except that currently on the website charging
            is <span className="underline">prepaid</span> and on the app
            charging is <span className="underline">postpaid</span>. While not
            my decision, this is because prepaid charging is quicker and likely
            to be less confusing for one time users on the web app.
          </div>
          <div>
            Moving on, from the ChargeMap one can navigate to a nearby location
            and view the chargers at that location. For locations using our
            software, one can see the status of a charger (whether it is
            charging, finishing, preparing, available etc..). They can also see
            pricing details for charging and parking as well as useful
            information about the device itself such as it's{' '}
            <SiteLink href="https://en.wikipedia.org/wiki/Charging_station#Standards">
              Plug Type
            </SiteLink>
            , Charging Rate and Model. For offline locations, we simply include
            the device details. To infer this missing data, integration of
            charging locations and their details from 3rd party sites is a major
            feature planned for 2023. An exciting upcoming feature, as it will
            result in a boom in locations and therefore usability of the
            software for drivers.
          </div>
          <div className="flex flex-row justify-center gap-x-12">
            <Image
              src="/assets/evup/locationdrawer.png"
              width={200}
              height={100}
              quality={100}
              alt=""
              className="bg-white border-2 border-black rounded-lg"
            />
            <Image
              src="/assets/evup/chargenow.png"
              width={200}
              height={100}
              quality={100}
              alt=""
              className="bg-white border-2 border-black rounded-lg"
            />
          </div>
          <div>
            If a charger is currently being used, any user can also see live
            details about the session in progress, such as kWh consumed, the
            type of session in progress, and the live charging rate of the
            device. For mobile users who started the session, they can monitor
            their session easily from a drawer which will fix itself on the
            ChargeMap page.
          </div>
          <div>
            These sessions also have robust underlying measures to ensure
            drivers get the best service possible, in particular smart
            disconnection handling (among other internal optimisations). Have
            you ever experienced the sheer panic of trying to cancel a Lime
            scooter or Uber when your internet drops out? You're often forced to
            concede that you might waste a significant amount of money that
            night.
          </div>
          <div>
            Well with EVUp, when a device disconnects from our servers (which
            currently seems to be a significant bottleneck of OCPP technology)
            all payments dynamically stop applying, and pick up where you left
            off if a reconnection occurs. If not, the sessions will always end
            30 mins after the disconnection, ensuring you never get charged more
            than what you receive. In contrast, it also supports the application
            of Idle Fees, which start applying once our servers register a
            vehicle is full.
          </div>
          <div className="flex flex-row justify-center gap-x-12">
            <Image
              src="/assets/evup/session.png"
              width={200}
              height={100}
              quality={100}
              alt=""
              className="bg-white border-2 border-black rounded-lg"
            />
            <Image
              src="/assets/evup/erroredsession.png"
              width={200}
              height={100}
              quality={100}
              alt=""
              className="bg-white border-2 border-black rounded-lg"
            />
            <Image
              src="/assets/evup/parkingsession.png"
              width={200}
              height={100}
              quality={100}
              alt=""
              className="bg-white border-2 border-black rounded-lg"
            />
          </div>
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
          <div className="flex flex-row justify-center gap-x-12">
            <Image
              src="/assets/evup/usermenu.png"
              width={200}
              height={100}
              quality={100}
              alt=""
              className="bg-white border-2 border-black rounded-lg"
            />
            <Image
              src="/assets/evup/wallet.png"
              width={200}
              height={100}
              quality={100}
              alt=""
              className="bg-white border-2 border-black rounded-lg"
            />
            <Image
              src="/assets/evup/sessionhistory.png"
              width={200}
              height={100}
              quality={100}
              alt=""
              className="bg-white border-2 border-black rounded-lg"
            />
          </div>
          <h1 className="mt-2 text-2xl underline text-secondary">
            EVUp for Charger Owners
          </h1>
          <div>
            EVUp for Charger Owners enables owners of any electric vehicle
            charger (compatible with OCPP 1.6-J) to easily connect to EVUp and
            create their own charging station. They can monitor as well as
            monetise and balance devices they connect with - priming their
            chargers to be usable by the public. All they have to do is create
            an admin account at{' '}
            <SiteLink href="https://charge.evup.com.au/admin-signup">
              this link
            </SiteLink>
            . This side of the software requires payment, whereby each charging
            station incurs $49.99 per month or $495 per year subscriptions. Once
            you create your admin account, you'll see the EVUp Admin Dashboard -
            which is only available on web.
          </div>
          <Image
            src="/assets/evup/subdashboard.png"
            width={550}
            height={100}
            quality={100}
            alt=""
            className="bg-white border-2 border-black mx-auto rounded-lg"
          />
          <div>
            From here you can navigate to Locations and create and upload
            metadata to as many locations as you purchased. After that, you can
            connect your charger to our servers by navigating to Devices and
            going through the enrolment process. In this process you point your
            device to a specified websocket url, then match it with a device
            preset made by EVUp (visible in Presets). After adding it to your
            location, you've successfully setup your EVUp charging station.
          </div>
          <div>
            In order to utilise our paidcharging service, navigating to Tariffs
            will enable you to create tariffs you can apply to your devices back
            at the Devices page. We also include some neat graphics about the
            charging sessions that have occurred under your tenancy, under
            Paidcharging, which uses the data from the Sessions page. Most of
            what else is included in these pages is fairly self-explanatory, or
            are purchasable extensions on top of the software (like{' '}
            <SiteLink href="https://www.evup.com.au/ev-charging-station-load-management">
              DLB
            </SiteLink>
            ). While I won't show all the pages here, I can showcase the
            paidcharging dashboard for reference.
          </div>
          <Image
            src="/assets/evup/paidchargingdashboard.png"
            width={550}
            height={100}
            quality={100}
            alt=""
            className="bg-white border-2 border-black mx-auto rounded-lg"
          />
          <h1 className="mt-2 text-2xl underline text-secondary">
            The Future of EVUp
          </h1>
          <div>
            EVUp is currently in version 2.0.0 and still growing everyday.
            Planned additions coming soon include:
            <ul className="list-disc ml-6">
              <li>
                The addition of all globally registered charging locations, by
                integrating with 3rd party services like Plugshare
              </li>
              <li>
                A My Vehicles page in the menu, where you can add your vehicle
                and the software will infer what charger type you need, then
                direct you to the nearest available port of that type
              </li>
              <li>RFID support for drivers</li>
              <li>
                Integration of the Tesla API, enabling interaction between your
                charging session in EVUp and your car in the Tesla app
              </li>
            </ul>
          </div>
          <div>
            These changes intend to come together to offer a conclusive and
            comprehensive app that, in amalgamation with the factilies offered
            by EVUp for Charger Owners (Admin Portal), intend to provide an
            all-in-one package of features for electric vehicle charging.
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
