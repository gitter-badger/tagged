# Tagged

[![Join the chat at https://gitter.im/domma/tagged](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/domma/tagged?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Tagged is supposed to help with managing offers and requests in the context of helping refugees.  The basic idea are
just tagged texts, wich are easy to enter and easy to search for. Tags can be choosen at hoc, similar to Twitter hash
tags. The system does not enforce and structure and idealy it will be self organizing, without too much intervention from
the maintainers.

## System architecture (suggestions are welcome of coures)

 * The only required data storage is Elasticsearch (ES). ES is available as a prepared Docker container which is
   perfectly fine to get stared with, but gives us also the option to scale to a cluster, which could handle all the
   refugee projects of the world.

 * The data layer will be impleted as a RESTlike service in Python3. Python3 supports asyncio out of the box, so we get
   all the [buzz words of your choice] like Nodejs, but with a decent language. The implemented functionality will be
   quite straight forward:

   * Add some text which describes your offer or request and assign some tags to it. You are free to choose any tags,
     but the system will of course provide text completion as you know it from a google search, but based on existing
     tags. It might also suggest matching tags based on existing data and your text, as you know it from Stackoverflow.

   * Search: Your search will start with an empty search box and a list of the most common tags. You can either restrict
     your search by typing in some search text or by selecting a facet as a filter. By doing so, you will restrict the
     result set and you will get new proposed tags to refine your search further. This kind of drill down search is part
     of my day to day work and has proven to be very powerfull, but also very convenient and easy to understand for
     normal non technical users. I have no idea why it is not used more often!?

 * The front end will be pure Javascript. Hopefully Thorsten will jump in, so it's probably based on Angular or whatever is
   needed to get it up and running in a browser and on a mobile device.

 * Service + front end + Nginx will be packaged into a second container. So deploying and linking those two containers
   will be everything required to run an instance of Tagged.

 * A set of devops scripts (in Python2, due to Fabric not being Python3 ready) will allow easy deployment to
   DigitalOcean. DigitalOcean is just my first choice, as I'm using it already. Feel free to suggest a better provider
   and of course we might provide more providers if there is the need. Having those script, it is easy to deploy
   "privat" instances, in case somebody would not like to use a public one.

 * Authentication will be handled via Auth0. This makes live and user management much easier. It also allows setup of
   "private" instances.


##  Future steps

Future steps depend of course on the acceptance of the system and the requirements of the users. But some steps are
quite likely and obvious:

 * Build tools to manage and merge tags. Even a self organizing system can benefit from some support.

 * Grouping of tags: In version 1 there will just be tags. We might want to group them, for example having dedicated
   "location tags". I don't think it makes sense to thing about useful groups, as long as the system is not in use and
   we have real data. In my opinion that's the biggest mistake of most system of that kind: Introduction of not really
   fitting structure too early.

 * Real time notifications: ES supports a feature called Percolators, which allows to match new documents against stored
   queries. This allows two kind of notifications: The classical one is, that a user stores a query (i.e. tells us "Inform
   me, if something is about 'abc' and has the tag 'xxx' or 'yyy' but not 'zzz'.") and will get an email, sms, ... The
   other option is, that we can update results of executes queries, which are still open in a browser or on a mobil
   device. Or in more non technical terms: You tell what you are interested in. If something like this pops up, you will
   get a mail or your mobile will bing. ;-)

 * More sophisticated workflows, supporting use cases we do not know yet.
